import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import LoadingAnimation from '../LoadingAnimation';
import Embeddable from '../Embeddable';

interface Props {
    className: string;
}

export default function Link(props: Props) {
    const post = useSelector((state: State) => state.post);
    const [isImage, setIsImage] = React.useState(false);
    const [isLoadable, setIsLoadable] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(true);
    const [showEmbed, setShowEmbed] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        post && (async function () {
            tryImage(post.url)
                .then(() => {
                    setIsImage(true);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoadable(false);
                    setIsLoading(false)
                })
        })();
    }, [post]);

    if (isLoading) {
        return <LoadingAnimation />;
    }

    if (!post) {
        return null;
    }

    return (
        <div className={`Link ${props.className}`}>
            <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {isImage ? <img src={post.url} alt="Direct link" /> : 'Direct link'}
            </a>
            {(!isLoadable) && <React.Fragment>
                <span className='link toggleEmbeddable' onClick={() => setShowEmbed(!showEmbed)}>
                    {showEmbed ? 'Hide embedded content' : 'Show embedded content'}
                </span>
                {showEmbed && <Embeddable url={post.url} />}
            </React.Fragment>}
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
