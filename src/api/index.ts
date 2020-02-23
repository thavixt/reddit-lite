import snoowrap from 'snoowrap';
// https://www.reddit.com/prefs/apps

// TODO: todo rewrite with snoowrap
// https://github.com/not-an-aardvark/snoowrap
// do auth
// handle voting and commenting?
// saving, subscriptions and custom multis, etc ...

const r = new snoowrap({
    userAgent: 'Reddit-Lite-v' + process.env.REACT_APP_VERSION,
    clientId: process.env.REACT_APP_TWITCH_APP_ID,
    clientSecret: process.env.REACT_APP_TWITCH_APP_SECRET,
    refreshToken: process.env.REACT_APP_TWITCH_APP_REFRESH_TOKEN
});

const postCache = new Map<string, any>();

export default {
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
