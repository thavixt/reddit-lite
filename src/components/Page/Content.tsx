import React, { useEffect, useState } from 'react';
import { Parser } from 'html-to-react';
import unescape from 'unescape';
import Link from '../Link';
import Loading from '../Loading';

const htmlToReactParser = new Parser();


export default function Content({ embed, metadata, selftext, url, video }: {
    embed?: string;
    video?: string;
    metadata?: string;
    selftext?: string;
    url?: string;
}) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(false);
        setTimeout(() => setReady(true), 1);
    }, [embed, selftext, url, video]);

    if (!ready) {
        return <Loading />
    }

    return (
        <div className="content">
            {embed && <div className="embed">{htmlToReactParser.parse(unescape(embed))}</div>}
            {video && <video controls className="video">
                <source src={video} type="video/webm" />
            </video>}
            {selftext && <div
                className="html"
                dangerouslySetInnerHTML={{ __html: unescape(selftext) }}
            />}
            {metadata && <Link className="metadata" url={unescape(metadata)} />}
            {!embed && !video && url && <Link className="url" url={url} />}
        </div>
    );
}
