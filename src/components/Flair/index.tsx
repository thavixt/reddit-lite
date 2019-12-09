import React from 'react';

import './style.css';

interface Props {
    className?: string;
    key: number | string;
    e: string;
    t: any;
}

export default function Flair(props: Props) {
    const { e, t } = props;

    if (!t) {
        return null;
    }

    return <span className={`Flair ${e} ${props.className}`}>{t}</span>
}
