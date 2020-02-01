import { createStore, Reducer } from 'redux';
import { getQueryParam, setQueryParam } from '../utils';

import Reddit from '../api';

const initialState: State = {
    post: getQueryParam('post') || null,
    subReddit: getQueryParam('sub') || 'all',
    sort: getQueryParam('sort') || 'hot',
    timeFrame: getQueryParam('time') || 'hour',
};

const reducer: Reducer = (state = initialState, action: Action) => {
    let newState = state;
    switch (action.type) {
        case 'LOAD_POST':
            loadPost(action.payload.subReddit, action.payload.post);
            break;

        case 'SET_POST':
            setQueryParam('post', action.payload.id);
            newState = {
                ...state,
                post: action.payload,
            }
            break;

        case 'SET_SUBREDDIT':
            setQueryParam('sub', action.payload);
            newState = {
                ...state,
                subReddit: action.payload,
                sort: 'hot',
            }
            break;

        case 'SET_SORT':
            setQueryParam('sort', action.payload);
            newState = {
                ...state,
                sort: action.payload,
            }
            break;

        case 'SET_TIMEFRAME':
            setQueryParam('time', action.payload);
            newState = {
                ...state,
                timeFrame: action.payload,
            }
            break;

        default:
            newState = { ...state };
            break;
    }


    return newState;
}

const store = createStore(reducer);

export default store;

async function loadPost(subReddit: string, id: string) {
    const post = await Reddit.post(subReddit, id);
    const postObject = post.length ? post[0].data.children[0].data : null;
    if (postObject) {
        store.dispatch({
            type: 'SET_POST',
            payload: postObject,
        });
    }
}
