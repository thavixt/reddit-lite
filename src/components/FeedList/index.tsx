import React from 'react';
import { useSelector } from 'react-redux';

import LoadingAnimation from '../LoadingAnimation';
import Reddit from '../../api';
import Post from '../Post';

export default function FeedList() {
    const [after, setAfter] = React.useState(null);
    const [feed, setFeed] = React.useState<Reddit.Post[]>([]);
    const [loadedMoreCount, setLoadedMoreCount] = React.useState(0);
    const [loadingMore, setLoadingMore] = React.useState(false);

    const subReddit = useSelector((state: State) => state.subReddit);
    const sort = useSelector((state: State) => state.sort);
    const timeFrame = useSelector((state: State) => state.timeFrame);

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        (async function fetchFeed() {
            !loadingMore && setFeed([]);
            const afterRef = loadingMore ? after : null;

            const fetchedFeed = await Reddit.feed(subReddit, sort, timeFrame, afterRef);
            const posts = fetchedFeed.data.children.map((post: { data: Reddit.Post }) => post.data);

            if (loadingMore) {
                setFeed([...feed, ...posts]);
                setLoadingMore(false);
            } else {
                setFeed(posts);
                ref.current && ref.current.scrollTo(0, 0);
            }

            setAfter(fetchedFeed.data.after);
        })();
        // eslint-disable-next-line
    }, [subReddit, sort, timeFrame, loadedMoreCount]);

    const feedList = feed.map((post: Reddit.Post) =>
        <Post post={post} key={post.id} />);

    const more =
        <p className="more" onClick={() => {
            setLoadingMore(true);
            setLoadedMoreCount(loadedMoreCount + 1);
        }}>
            Load more
        </p>;

    return (
        <div className='FeedList'>
            <div className="list" ref={ref}>
                {feedList.length ? feedList : <LoadingAnimation />}
                {loadingMore ? <LoadingAnimation size="small" /> : more}
            </div>
        </div>
    );
}
