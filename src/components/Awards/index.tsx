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

    const awards = props.awards.map((award, i) =>
        <span key={i} className="award" title={award.name}>
            <img src={award.icon_url} alt={award.name} />
            {award.count > 1
                ? <span className="count">{award.count}</span>
                : null
            }
        </span>);

    return (
        <div className="Awards">
            {awards}
        </div>
    )
}
