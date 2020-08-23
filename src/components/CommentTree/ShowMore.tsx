import React from 'react';
import Loading from '../Loading';

export default function ShowMore(props: Reddit.Comment) {
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
        return <Loading size="small" />;
    }

    return (
        <div className="Comment ShowMore link" onClick={load}>
            {props.data.count} more replies
        </div>
    )
}
