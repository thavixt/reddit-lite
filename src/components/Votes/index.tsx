import React from 'react';

interface Props {
    arrows?: boolean;
    className?: string;
    children?: React.ReactChild;
    score: number;
}

export default function Votes(props: Props) {
    const { score } = props;
    const truncatedScore = score > 1000
        ? `${Math.round(score / 1000 * 10) / 10}K`
        : score;

    return (
        <div className={`Votes ${props.className} ${props.arrows && 'arrows'}`}>
            {props.arrows && <span className="upvote">
                ▲
            </span>}
            <span className="score">
                {truncatedScore} {props.children}
            </span>
            {props.arrows && <span className="downvote">
                ⯆
            </span>}
        </div>
    )
}
