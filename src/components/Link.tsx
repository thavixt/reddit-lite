import React from 'react';
import Loading from './Loading';

interface Props {
    className: string;
    url: string;
}

export default function Link(props: Props) {
    const { url } = props;
    const [isImage, setIsImage] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        url && (async function () {
            tryImage(url)
                .then(() => {
                    setIsImage(true);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false)
                })
        })();
    }, [url]);

    if (isLoading) {
        return <Loading />;
    }

    if (!url) {
        return null;
    }

    return (
        <div className={`Link ${props.className}`}>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {isImage ? <img src={url} alt="Direct link" /> : url}
            </a>
        </div>
    )
}

async function tryImage(url: string, timeoutMs = 5000) {
    return new Promise((resolve, reject) => {
        let timer: NodeJS.Timeout;
        const timeout = timeoutMs;
        const img = new Image();
        img.onerror = () => {
            clearTimeout(timer);
            reject();
        };
        img.onabort = () => {
            clearTimeout(timer);
            reject();
        };
        img.onload = () => {
            clearTimeout(timer);
            resolve();
        };
        timer = setTimeout(() => {
            img.src = "";
            reject();
        }, timeout);
        img.src = url;
    });
}
