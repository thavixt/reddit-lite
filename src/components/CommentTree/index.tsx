import React from 'react';
import unescape from 'unescape';
import Reddit from '../../api/reddit';
import './style.scss';
import Awards from '../Awards';
import LoadingAnimation from '../LoadingAnimation';
import Timestamp from '../Timestamp';
import Votes from '../Votes';

interface Props {
    id: string;
    sub: string;
}

export default function CommentTree(props: Props) {
    // console.log(props);

    const { id, sub } = props;
    const [isLoading, setLoading] = React.useState(false);
    const [comments, setComments] = React.useState<Reddit.Comment['data'] | null>(null);
    // console.log(comments);

    React.useEffect(() => {
        setLoading(true);
        (async function fetchComments() {
            const comments = await Reddit.comments(sub, id);
            if (!comments.error) {
                setComments(comments[1].data);
            }
            setLoading(false);
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
            <div className="header">
                <span className="author">{data.author}</span> &nbsp;
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
                className="body"
                dangerouslySetInnerHTML={{ __html: unescape(data.body_html) }}
            />
            {replies}
        </div>
    );
}
