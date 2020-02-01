declare module 'unescape';

type Sort = 'hot' | 'new' | 'controversial' | 'top' | 'rising';
type TimeFrame = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

type ActionType = 'SET_POST' | 'SET_SUBREDDIT' | 'SET_SORT' | 'SET_TIMEFRAME' | 'LOAD_POST';

interface Action {
    type: string;
    payload?: any;
}

interface APIError {
    error: any;
}

interface State {
    post: null | Post;
    sort: Sort;
    subReddit: string;
    timeFrame: TimeFrame;
}

namespace API {
    interface Error {
        error: any;
    }

    type CommentsResponse = Comments | Error;
    type FeedResponse = Feed | Error;
}

namespace Reddit {
    interface Award {
        count: number;
        name: string;
        icon_url: string;
    }

    interface Comment {
        data: {
            all_awardings: Award[];
            author: string;
            body_html: string;
            created_utc: number;
            count: number;
            children: Comment[];
            id: string;
            is_submitter: boolean;
            replies: Comment;
            score: numnber;
            score_hidden: boolean;
            stickied: boolean;
        };
    }

    interface Feed {
        data: {
            children: Post[];
        }
    }

    interface Flair {
        e: string,
        t: any,
    }

    export interface Post {
        all_awardings: Award[];
        author: string;
        created_utc: number;
        crosspost_parent_list: Post[];
        id: string;
        link_flair_richtext: Flair[];
        media: any;
        media_embed: any;
        num_comments: number;
        permalink: string;
        score: number;
        selftext_html: string;
        subreddit: string;
        thumbnail: string;
        title: string;
        url: string;
    }
}
