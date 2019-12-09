import React from 'react';
import './style.scss';

interface Props {
    size?: string;
}

export default function LoadingAnimation(props: Props) {
    return (
        <div className={`LoadingAnimation ${props.size || ''}`}>
            <div className="lds-dual-ring"></div>
        </div>
    )
}
