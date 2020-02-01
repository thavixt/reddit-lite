import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import unescape from 'unescape';
import './style.scss';
import Awards from '../Awards';
import Flair from '../Flair';
import Timestamp from '../Timestamp';
import Votes from '../Votes';

// const REDDIT_BASE_URL = 'https://reddit.com'
const SELF_POST_THUMB_SRC = `${process.env.PUBLIC_URL}/horizontal-lines.png`;

interface Props {
    post: Reddit.Post;
}

export default function Post(props: Props) {
    const { post } = props;

    const dispatch = useDispatch();
    const currentPostId = useSelector((state: State) => state.post && state.post.id);

    const hasThumbnail = post.thumbnail && post.thumbnail !== 'self';
    const thumb_url = hasThumbnail ? post.thumbnail : SELF_POST_THUMB_SRC;
    const flairs = post.link_flair_richtext.map((e, i) => <Flair key={i} {...e} />);

    return (
        <div className={'Post' + (post.id === currentPostId ? ' highlighted' : '')}
            onClick={() => dispatch({ type: 'SET_POST', payload: post, })}
        >
            <Votes className="score" score={post.score} arrows />
            <div className='thumbnail'>
                <a href={post.url} target='blank' rel="noreferrer noopener">
                    <img className={hasThumbnail ? '' : 'default'} src={thumb_url} alt="thumb" />
                </a>
            </div>
            <div className="details">
                <small className='author'>u/{post.subreddit}</small>
                -
                <small className='date'>
                    <Timestamp timestamp={post.created_utc} />
                </small>
                <p className='title'>{unescape(post.title)}</p>
                {flairs}
                <Awards awards={post.all_awardings} />
                {post.num_comments > 0 && <p className="commentCount">
                    {post.num_comments} comment{post.num_comments > 1 && 's'}
                </p>}
            </div>
        </div>
    )
}
