import snoowrap from 'snoowrap'
import Snoowrap from 'snoowrap';

const prod = process.env.NODE_ENV === 'production';

const USER_AGENT_STRING = 'Reddit-Lite-v' + process.env.REACT_APP_VERSION!
    + '_' + process.env.NODE_ENV;
const CLIENT_ID = prod
    ? process.env.REACT_APP_REDDIT_APP_ID!
    : process.env.REACT_APP_REDDIT_APP_ID_DEV!;
const BASE_PATH = prod
    ? process.env.REACT_APP_BASE_PATH!
    : process.env.REACT_APP_BASE_PATH_DEV!;
const REFRESH_TOKEN = prod
    ? process.env.REACT_APP_REDDIT_APP_REFRESH_TOKEN!
    : process.env.REACT_APP_REDDIT_APP_REFRESH_TOKEN_DEV!;
const REDIRECT_URI = prod
    ? process.env.REACT_APP_REDDIT_REDIRECT_URI!
    : process.env.REACT_APP_REDDIT_REDIRECT_URI_DEV!;

type Instance = null | {
    authenticated: snoowrap,
    anonymous: null,
} | {
    authenticated: null,
    anonymous: snoowrap,
}

let _instance: Instance = null;
let userDataCache: Snoowrap.RedditUser | null = null;

const postCache = new Map<string, any>();

async function createInstance(): Promise<snoowrap> {
    return new Promise((resolve, reject) => {
        if (_instance) {
            resolve(_instance.authenticated || _instance.anonymous);
        }

        console.info('creating scoowrap instance');
        const tokens = getTokens();
        if (tokens) {
            const r = new snoowrap({
                userAgent: USER_AGENT_STRING,
                clientId: CLIENT_ID,
                clientSecret: '',
                refreshToken: tokens.refreshToken,
            });
            _instance = {
                authenticated: r,
                anonymous: null,
            }
            console.info('authenticated user');
            resolve(r);
        } else {
            const r = new snoowrap({
                userAgent: USER_AGENT_STRING,
                clientId: CLIENT_ID,
                clientSecret: '',
                refreshToken: REFRESH_TOKEN,
            });
            _instance = {
                authenticated: null,
                anonymous: r,
            }
            console.info('anonymous user');
            resolve(r);
        }

        reject("No API instance could be created.");
    })
}

async function getInstance() {
    if (_instance) {
        return _instance.authenticated || _instance.anonymous;
    }

    return await createInstance();
}

function getTokens() {
    const accessToken = window.localStorage.getItem('redditAccessToken');
    const refreshToken = window.localStorage.getItem('redditRefreshToken');
    if (accessToken && refreshToken) {
        return { accessToken, refreshToken };
    }
    return null;
}

function saveTokens(accessToken: string, refreshToken: string) {
    window.localStorage.setItem('redditAccessToken', accessToken);
    window.localStorage.setItem('redditRefreshToken', refreshToken);
}

function clearTokens() {
    window.localStorage.removeItem('redditAccessToken');
    window.localStorage.removeItem('redditRefreshToken');
}

async function auth() {
    return new Promise((resolve) => {
        const code = new URL(window.location.href).searchParams.get('code');

        if (code) {
            console.info('auth attempt');
            snoowrap.fromAuthCode({
                code,
                userAgent: USER_AGENT_STRING,
                clientId: CLIENT_ID,
                redirectUri: REDIRECT_URI,
            }).then((r) => {
                console.log(r);
                saveTokens(r.accessToken, r.refreshToken);
                if (!_instance) {
                    _instance = {
                        authenticated: r,
                        anonymous: null,
                    };
                }
                _instance.authenticated = r;
                console.info('authenticated');
                const params = new URL(window.location.href).searchParams;
                params.delete('code');
                params.delete('state');
                window.location.search = params.toString();
            }).catch((reason) => console.error(reason));
        } else {
            resolve();
        }
    })
}

function redirectAuth() {
    const authURL = snoowrap.getAuthUrl({
        clientId: CLIENT_ID!,
        scope: ['account', 'edit', 'history', 'identity', 'modflair', 'modlog', 'modmail', 'modposts', 'modself', 'modwiki', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread'],
        redirectUri: REDIRECT_URI! + window.location.search,
        permanent: true,
        state: 'authenticated'
    });
    window.location.href = authURL;
}

function logout() {
    clearTokens();
    window.location.href = BASE_PATH!;
}

function getUser(): Promise<Snoowrap.RedditUser> {
    return new Promise((resolve) => {
        if (userDataCache) {
            resolve(userDataCache);
        } else {
            getInstance()
                .then(s => s.getMe())
                .then(u => {
                    userDataCache = u;
                    resolve(u);
                })
        }
    });
}

const isAuthenticated = () => (_instance && _instance.authenticated) ? true : false;

export default {
    auth,
    redirectAuth,
    logout,

    createInstance,
    getInstance,

    isAuthenticated,
    getUser,

    feed(subreddit: string, sort: Sort, time: TimeFrame, after?: string | null): Promise<API.FeedResponse> {
        const q = time ? `t=${time}` : '';
        const a = after ? `after=${after}` : '';
        const s = sort || 'hot';
        return new Promise((resolve, reject) => {
            fetch(`https://www.reddit.com/r/${subreddit}/${s}.json?${q}&${a}`)
                .then(response => response.text())
                .then(JSON.parse)
                .then(resolve)
                .catch(() =>
                    reject(`Could not fetch top for reddit.com/r/${subreddit}/${s}.json${q}`)
                );
        })
    },
    post(subreddit: string, postId: string): Promise<API.CommentsResponse> {
        if (postCache.has(postId)) {
            return postCache.get(postId);
        }
        return new Promise((resolve, reject) => {
            fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`)
                .then(response => response.text())
                .then(JSON.parse)
                .then(post => {
                    postCache.set(postId, post);
                    resolve(post);
                })
                .catch(() =>
                    reject(`Could not fetch comments for reddit.com/r/${subreddit}/comments/${postId}.json`)
                );
        })
    },
    comments(subreddit: string, postId: string): Promise<API.CommentsResponse> {
        return new Promise((resolve, reject) => {
            fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`)
                .then(response => response.text())
                .then(JSON.parse)
                .then(resolve)
                .catch(() =>
                    reject(`Could not fetch comments for reddit.com/r/${subreddit}/comments/${postId}.json`)
                );
        })
    },
}
