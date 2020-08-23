import React from 'react';

import defaultThumbImage from '../../images/horizontal-lines.png';

export default function Thumbnail({ url, thumbnail }: { url: string, thumbnail: string }) {
    const defaultImg = !thumbnail.match(/^http/);
    return (
        <div className='thumbnail'>
            {/* <a href={url} target='blank' rel="noreferrer noopener"> */}
            <img
                className={defaultImg ? 'default' : ''}
                src={defaultImg ? defaultThumbImage : thumbnail}
                alt="thumbnail"
            />
            {/* </a> */}
        </div>
    );
}
