import React from 'react';

interface Props {
    size?: 'tiny' | 'small' | 'large' | 'huge';
}

export default function Loading(props: Props) {
    return (
        <div className={`Loading ${props.size || ''}`}>
            <div className="lds-dual-ring"></div>
        </div>
    )
}
