import React, { useState } from 'react';
import { isAuthenticated } from '../api';

interface Props {
    arrows?: boolean;
    className?: string;
    children?: React.ReactChild;
    score?: number;
    upvoted?: boolean;
    downvoted?: boolean;
    upvote?(): Promise<void>;
    downvote?(): Promise<void>;
}

export default function Votes(props: Props) {
    const [upvoted, setUpvoted] = useState(props.upvoted || false);
    const [downvoted, setDownvoted] = useState(props.downvoted || false);
    const disabled = !isAuthenticated();

    let truncatedScore;
    if (props.score) {
        truncatedScore = props.score > 1000
            ? `${Math.round(props.score / 1000 * 10) / 10}K`
            : props.score;
    }

    function upvote(e: React.SyntheticEvent) {
        e.stopPropagation();
        if (!props.upvote) {
            return;
        }
        if (!upvoted) {
            props.upvote();
        }
        setUpvoted(!upvoted);
    }

    function downvote(e: React.SyntheticEvent) {
        e.stopPropagation();
        if (!props.downvote) {
            return;
        }
        if (!downvoted) {
            props.downvote();
        }
        setDownvoted(!downvoted);
    }

    return (
        <div className={`Votes ${props?.className ?? ''} ${props.arrows ? 'arrows' : ''}`}>
            {props.arrows && <span
                className={`upvote ${upvoted ? 'upvoted' : ''} ${disabled ? 'disabled' : ''}`}
                onClick={upvote}>
                ▲
            </span>}
            {props.score && <span className="score">
                {truncatedScore} {props.children}
            </span>}
            {props.arrows && <span
                className={`downvote ${downvoted ? 'upvoted' : ''} ${disabled ? 'disabled' : ''}`}
                onClick={downvote}>
                ⯆
            </span>}
        </div>
    )
}
