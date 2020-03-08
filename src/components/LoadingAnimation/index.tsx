import React from 'react';

interface Props {
    size?: 'tiny' | 'small' | 'large' | 'huge';
}

export default function LoadingAnimation(props: Props) {
    return (
        <div className={`LoadingAnimation ${props.size || ''}`}>
            <div className="lds-dual-ring"></div>
        </div>
    )
}
