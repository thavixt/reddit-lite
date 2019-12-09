import React from 'react';
import './style.scss';

interface Props {
    awards: Reddit.Award[];
    className?: string;
}

export default function Awards(props: Props) {
    if (!props.awards.length) {
        return null;
    }

    const awards = props.awards.map((el, i) =>
        <span key={i} className="award">
            <img src={el.resized_icons[0].url} alt={el.name} />
            <span className="count">{el.count}</span>
        </span>);

    return (
        <div className="Awards">
            {awards}
        </div>
    )
}
