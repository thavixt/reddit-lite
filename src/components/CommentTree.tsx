import React from 'react';
import Reddit from '../api';
import CommentBranch from './CommentTree/CommentBranch';
import Loading from './Loading';
import { setLinkTargets } from '../utils'

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
        return <Loading />;
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
