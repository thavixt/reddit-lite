import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import unescape from 'unescape';
import Awards from './Awards';
import CommentTree from './CommentTree';
import Flair from './Flair';
import Content from './Page/Content'
import Timestamp from './Timestamp';
import Votes from './Votes';

const REDDIT_BASE_URL = 'https://reddit.com';

interface Props {
    className?: string;
    crossPostLevel?: number;
}

export default function Page(props: Props) {
    const { crossPostLevel = 0 } = props;

    const dispatch = useDispatch();
    const ref = React.useRef<HTMLDivElement>(null);
    const currentPost = useSelector((state: State) => state.post);

    let post = currentPost;

    useEffect(() => {
        if (ref && ref.current) {
            ref.current.scrollTo(0, 0)
        }
    }, [post]);


    if (!post) {
        return null;
    }

    let level = 0;
    while (level < crossPostLevel && post.crosspost_parent_list.length) {
        post = post.crosspost_parent_list[0] ?? post;
        level++;
    }

    const embed = post.media_embed?.content;
    const video = post.media?.reddit_video?.fallback_url;
    const metadata = post.media_metadata?.[(Object.keys(post.media_metadata)[0])]?.s.u;

    const flairs = post.link_flair_richtext.map((e: Reddit.Flair, i: number) =>
        <Flair key={i} {...e} />
    );

    return (
        <div className={`Page ${props.className}`} ref={ref}>
            <div className="header">
                <div className="block">
                    <Votes className="score" score={post.score}> points</Votes>
                    <span className="sub"> -&nbsp;
                        <span
                            className="bold link"
                            onClick={() => dispatch({
                                type: 'SET_SUBREDDIT',
                                payload: (post as Reddit.Post).subreddit
                            })}>
                            r/{post.subreddit}
                        </span>
                    </span>&nbsp;
                    <span className="author">
                        {post.crosspost_parent_list ? 'crossposted' : 'posted'} by u/{post.author}
                    </span>&nbsp;
                    <Timestamp className="date" timestamp={post.created_utc} />&nbsp;
                    {crossPostLevel > 0
                        ? <span
                            className="link"
                            onClick={() => dispatch({
                                type: 'SET_POST',
                                payload: post
                            })}>
                            (go to post)
                        </span>
                        : null}
                </div>
                <div className="title">
                    <h1>{unescape(post.title)}</h1>
                    {flairs}
                    <Awards awards={post.all_awardings} />
                </div>
            </div>
            {crossPostLevel > 0
                ? <Page className="crossPost" crossPostLevel={crossPostLevel + 1} />
                : <Content
                    embed={embed}
                    video={video}
                    metadata={metadata}
                    selftext={post.selftext_html}
                    url={post.url}
                />
            }
            <Comments post={post} crossPostLevel={crossPostLevel} />
        </div >
    )
}

function Comments({ post, crossPostLevel }: { post: Reddit.Post, crossPostLevel: number }) {
    return (
        <div className="comments">
            <p className="count">
                {post.num_comments > 0 && <span className="commentCount">
                    {post.num_comments} comment{post.num_comments > 1 && 's'}
                </span>}
                <span>&nbsp;
                    <a className="redditLink"
                        href={REDDIT_BASE_URL + post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        (open on reddit.com)
                    </a>
                </span>
            </p>
            {crossPostLevel > 0 ? null : <CommentTree sub={post.subreddit} id={post.id} />}
        </div>
    )
}


