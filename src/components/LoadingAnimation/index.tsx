import React from 'react';

interface Props {
    size?: 'large' | 'small';
}

export default function LoadingAnimation(props: Props) {
    return (
        <div className={`LoadingAnimation ${props.size || ''}`}>
            <div className="lds-dual-ring"></div>
        </div>
    )
}
