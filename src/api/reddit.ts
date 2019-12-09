// const ID = '_QR2sSnJl5pGEg';

export default {
    // constructor() {
    //     this.accessToken = null;
    // },

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
    }

    // async fetchAnonymousToken() {
    //     const token = this.getAccessToken();
    //     if (token) {
    //         this.accessToken = token;
    //         return this;
    //     }
    //     return new Promise((resolve, reject) => {
    //         console.log('fetching access token ...');
    //         const form = new FormData();
    //         form.set('grant_type', 'https://oauth.reddit.com/grants/installed_client');
    //         form.set('device_id', 'DO_NOT_TRACK_THIS_DEVICE');
    //         return fetch('https://www.reddit.com/api/v1/access_token', {
    //             method: 'post',
    //             body: form,
    //             headers: { authorization: `Basic ${btoa(ID + ':')}` },
    //             credentials: 'omit'
    //         }).then(response => response.text())
    //             .then(JSON.parse)
    //             .then(tokenInfo => tokenInfo.access_token)
    //             .then(this.saveAccessToken)
    //             .then(resolve)
    //             .catch(() => reject('Failed to fetch access token.'));
    //     })
    // },

    // getAccessToken() {
    //     const data = JSON.parse(localStorage.getItem('reddit_token'));
    //     console.log(data);
    //     return (data.timestamp > (Date.now()) - 60 * 60 * 1000) ? data.token : null;
    // },

    // saveAccessToken(token) {
    //     console.log('saving new access token for 1h ' + token);
    //     this.accessToken = token;
    //     localStorage.setItem('reddit_token', JSON.stringify({
    //         token,
    //         timestamp: Date.now(),
    //     }));
    // },
}
