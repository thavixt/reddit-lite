import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import unescape from 'unescape';

import Awards from '../Awards';
import Flair from '../Flair';
import Timestamp from '../Timestamp';
import Votes from '../Votes';

import defaultThumbImage from '../../images/horizontal-lines.png';

interface Props {
    post: Reddit.Post;
}

export default function Post(props: Props) {
    const { post } = props;
    const dispatch = useDispatch();
    const currentPostId = useSelector((state: State) => state.post && state.post.id);
    const flairs = post.link_flair_richtext.map((e, i) => <Flair key={i} {...e} />);

    return (
        <div className={'Post' + (post.id === currentPostId ? ' highlighted' : '')}
            onClick={() => {
                dispatch({ type: 'SET_POST', payload: post });
            }}
        >
            <Votes className="score" score={post.score} arrows />
            <Thumbnail url={post.url} thumbnail={post.thumbnail} />
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

function Thumbnail({ url, thumbnail }: { url: string, thumbnail: string }) {
    const defaultImg = thumbnail === 'self' || thumbnail === 'default';
    return (
        <div className='thumbnail'>
            <a href={url} target='blank' rel="noreferrer noopener">
                <img
                    className={defaultImg ? 'default' : ''}
                    src={defaultImg ? defaultThumbImage : thumbnail}
                    alt="thumbnail"
                />
            </a>
        </div>
    );
}
