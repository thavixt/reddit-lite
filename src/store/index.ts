import { createStore, Reducer } from 'redux';

const initialState: State = {
    post: null,
    subReddit: 'pathofexile',
    sort: 'hot',
    timeFrame: 'hour',
};

const reducer: Reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'SET_POST':
            return {
                ...state,
                post: action.payload,
            }

        case 'SET_SUBREDDIT':
            return {
                ...state,
                subReddit: action.payload,
                sort: 'hot',
            }

        case 'SET_SORT':
            return {
                ...state,
                sort: action.payload,
            }

        case 'SET_TIMEFRAME':
            return {
                ...state,
                timeFrame: action.payload,
            }

        default:
            return { ...state };
    }
}

export default createStore(reducer);
