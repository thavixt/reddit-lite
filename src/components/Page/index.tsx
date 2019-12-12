import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import unescape from 'unescape';
import './style.scss';
import Awards from '../Awards';
import CommentTree from '../CommentTree';
import Flair from '../Flair';
import Link from '../Link';
import Timestamp from '../Timestamp';
import Votes from '../Votes';

const REDDIT_BASE_URL = 'https://reddit.com';

interface Props {
    className?: string;
    crossPostLevel?: number;
}

export default function Page(props: Props) {
    const dispatch = useDispatch();
    let post = useSelector((state: State) => state.post)!;
    const { crossPostLevel = 0 } = props;
    // console.log(post);

    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (ref && ref.current) {
            ref.current.scrollTo(0, 0)
        }
    });

    if (!post) {
        return null;
    }

    let level = 0;
    while (level < crossPostLevel) {
        post = post.crosspost_parent_list[0];
        level++;
    }

    const embed = post.media_embed ? post.media_embed.content : null;
    const video = post.media && post.media.reddit_video
        ? post.media.reddit_video.fallback_url
        : null;

    const content = post.crosspost_parent_list
        ? <Page className="crossPost" crossPostLevel={crossPostLevel + 1} />
        : <div className="content">
            {embed && <div
                className="embed"
                dangerouslySetInnerHTML={{ __html: unescape(embed) }}
            />}
            {video && <video controls className="video">
                <source
                    src={video}
                    type="video/webm"
                />
            </video>}
            {!embed && !video && post.url && <Link className="url" />}
            <div
                className="html"
                dangerouslySetInnerHTML={{ __html: unescape(post.selftext_html) }}
            />
        </div>;

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
                                payload: post.subreddit
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
            {content}
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
        </div >
    )
}
