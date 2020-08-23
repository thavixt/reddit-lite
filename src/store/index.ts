import { createStore, Reducer } from 'redux';
import { getQueryParam, setQueryParam } from '../utils';

const initialState: State = {
    post: null,
    subReddit: getQueryParam('sub') || 'all',
    sort: getQueryParam('sort') || 'hot',
    timeFrame: getQueryParam('time') || 'hour',
};

const reducer: Reducer<State, Action> = (state = initialState, action: Action) => {
    let newState = state;

    switch (action.type) {
        case 'SET_POST': {
            setQueryParam('post', action.payload.id);
            newState = {
                ...state,
                post: action.payload,
            }
            break;
        }
        case 'SET_SUBREDDIT': {
            setQueryParam('sub', action.payload);
            newState = {
                ...state,
                subReddit: action.payload,
                sort: 'hot',
            }
            break;
        }
        case 'SET_SORT': {
            setQueryParam('sort', action.payload);
            newState = {
                ...state,
                sort: action.payload,
            }
            break;
        }
        case 'SET_TIMEFRAME': {
            setQueryParam('time', action.payload);
            newState = {
                ...state,
                timeFrame: action.payload,
            }
            break;
        }
        default: {
            return state;
        }
    }

    // console.info(action.type, { action, state, newState });
    return newState;
}

const store = createStore(reducer);

export default store;
