import React from 'react';
import unescape from 'unescape';
import Reddit from '../../api';
import './style.scss';
import Awards from '../Awards';
import LoadingAnimation from '../LoadingAnimation';
import Timestamp from '../Timestamp';
import Votes from '../Votes';

import { openLinksInNewTab } from '../../utils'

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
            openLinksInNewTab();
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
    const [more, loadMore] = React.useState(null);

    if (more) {
        // return <CommentBranch data={more} />
        return <div className="Comment">TODO load more</div>;
    }

    const load = () => {
        console.log('load more');
        // loadMore('TODO load more');
    }

    return (
        <div className="Comment ShowMore link" onClick={load}>
            {props.data.count} more replies
        </div>
    )

}


function CommentBranch(props: Reddit.Comment) {
    const { data } = props;

    if (data.count) {
        return <ShowMore data={data} />
    }

    const replies = data.replies && data.replies.data.children ?
        data.replies.data.children.map(el => <CommentBranch key={el.data.id} data={el.data} />)
        : null;

    return (
        <div className="Comment">
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
                <div
                    className="text"
                    dangerouslySetInnerHTML={{ __html: unescape(data.body_html) }}
                />
            </div>
            {replies}
        </div>
    );
}
