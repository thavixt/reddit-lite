declare module 'html-to-react';
declare module 'unescape';

type ActionType = 'SET_POST' | 'SET_SUBREDDIT' | 'SET_SORT' | 'SET_TIMEFRAME';

type Sort = 'hot' | 'new' | 'controversial' | 'top' | 'rising';
type TimeFrame = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

interface Action {
    type: ActionType;
    payload?: any;
}

interface APIError {
    error: any;
}

interface State {
    post: null | Reddit.Post;
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
        media?: {
            reddit_video?: {
                fallback_url: string;
            },
            oembed?: {
                description: string;
                height: number;
                html: string;
                provider_name: string;
                provider_url: string;
                thumbnail_height: number;
                thumbnail_url: string;
                thumbnail_width: number;
                title: string;
                type: "rich";
                url: string;
                version: string;
                width: number;
            }
        };
        media_embed?: {
            content: string;
            height: number;
            width: number;
            scrolling: boolean;
        };
        media_metadata?: {
            [key: string]: {
                e: string;
                id: string;
                m: string;
                p: { y: number; x: number; u: string }[];
                s: { y: number; x: number; u: string };
                status: string; // "valid"
            }
        }
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
