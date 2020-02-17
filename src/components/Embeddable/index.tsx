import React from 'react';
import './style.scss';

interface Props {
    url: string;
}

export default function Embeddable(props: Props) {
    return (
        <iframe className="Embeddable" src={props.url} />
    )
}
