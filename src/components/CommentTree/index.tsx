import React from 'react';
import unescape from 'unescape';

import Reddit from '../../api';
import Awards from '../Awards';
import LoadingAnimation from '../LoadingAnimation';
import Timestamp from '../Timestamp';
import Votes from '../Votes';

import { setLinkTargets } from '../../utils'

interface Props {
    id: string;
    sub: string;
}

export default function CommentTree(props: Props) {
    const { id, sub } = props;
    const [isLoading, setLoading] = React.useState(false);
    const [comments, setComments] = React.useState<Reddit.Comment['data'] | null>(null);

    React.useEffect(() => {
        setLoading(true);
        (async function fetchComments() {
            const comments = await Reddit.comments(sub, id);
            if (!comments.error) {
                setComments(comments[1].data);
            }
            setLoading(false);
            setLinkTargets('_blank');
        })()
    }, [sub, id]);

    if (isLoading) {
        return <LoadingAnimation />;
    }

    if (!comments) {
        return null;
    }

    const tree = comments.children.map((el: Reddit.Comment, i) =>
        <CommentBranch key={i} data={el.data} />
    );

    return (
        <div className="Comments">
            {tree}
        </div>
    );
}

function ShowMore(props: Reddit.Comment) {
    // TODO: functionality
    // eslint-disable-next-line
    const [more, loadMore] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    if (more) {
        // return <CommentBranch data={more} />
        return <div className="Comment">TODO load more</div>;
    }

    async function load() {
        setIsLoading(true);
        console.log('load more');
        // loadMore('TODO load more');
    }

    if (more) {
        return <p>more</p>;
    }

    if (isLoading) {
        return <LoadingAnimation size="small" />;
    }

    return (
        <div className="Comment ShowMore link" onClick={load}>
            {props.data.count} more replies
        </div>
    )

}

function CommentBranch(props: Reddit.Comment) {
    const [isOpen, setOpen] = React.useState(true);

    const { data } = props;

    if (data.count) {
        return <ShowMore data={data} />
    }

    const replies = data.replies && data.replies.data.children ?
        data.replies.data.children.map(el => <CommentBranch key={el.data.id} data={el.data} />)
        : null;

    return (
        <div className={`Comment ${isOpen ? '' : 'hidden'}`}>
            <div className="toggle" onClick={() => setOpen(!isOpen)}></div>
            <div className="content">
                <div className="body">
                    <div className="header">
                        <span className={`author${data.is_submitter ? ' op' : ''}`}>
                            {data.author}
                        </span>
                        {data.score_hidden ?
                            'score hidden'
                            : (<Votes className="score" score={data.score}> points</Votes>)
                        } -&nbsp;
                        <Timestamp className="date" timestamp={data.created_utc} />&nbsp;
                        <Awards className="awards" awards={data.all_awardings || []} />
                        {data.stickied && <span>
                            - <span className="stickied">sticked comment</span>
                        </span>}
                    </div>
                    {isOpen && <div
                        className="text"
                        dangerouslySetInnerHTML={{ __html: unescape(data.body_html) }}
                    />}
                </div>
                {isOpen && replies}
            </div>
        </div>
    );
}
