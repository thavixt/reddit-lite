// import snoowrap, { Listing, Submission } from 'snoowrap';
// https://www.reddit.com/prefs/apps

// TODO: todo rewrite with snoowrap
// https://github.com/not-an-aardvark/snoowrap
// do auth
// handle voting and commenting?
// saving, subscriptions and custom multis, etc ...

// const ID = 'oFZ3D0r5AsLYPQ';
// const SECRET = '74aTZKOW2qjn37pgtQfk8J1M2kA';
// const ACCESS_TOKEN = '37586904--hE4DSG04zktuXUmuI5YHvwvQRY';
// const REFRESH_TOKEN = '37586904-p1OMMks2UjXOL_-D3zmPkhc6Odg';

// const r = new snoowrap({
//     userAgent: 'Reddit-Lite-v0.1',
//     clientId: ID,
//     clientSecret: SECRET,
//     refreshToken: REFRESH_TOKEN
// });

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
                // .then(result => setTimeout(() => resolve(result), 2000))
                .catch(() =>
                    reject(`Could not fetch top for reddit.com/r/${subreddit}/${s}.json${q}`)
                );
        })
    },

    post(subreddit: string, postId: string): Promise<API.CommentsResponse> {
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
