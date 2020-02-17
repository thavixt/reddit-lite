import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import { deleteSavedSubReddit, getSavedSubs, saveSubReddit } from '../../utils';

const sortTypes: { [key: string]: string } = {
    hot: 'Hot',
    'new': 'New',
    controversial: 'Controversial',
    top: 'Top',
    rising: 'Rising',
};
const timeFrameTypes: { [key: string]: string } = {
    hour: 'Now',
    day: 'Today',
    week: 'This week',
    month: 'This month',
    year: 'This year',
    all: 'All time',
};

export default function FeedSelector() {
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const currentSubReddit = useSelector((state: State) => state.subReddit);
    const sort = useSelector((state: State) => state.sort);
    const timeFrame = useSelector((state: State) => state.timeFrame);
    const [isSubsOpen, setSubsOpen] = React.useState(false);
    const [isSortOpen, setSortOpen] = React.useState(false);
    const [isTimeOpen, setTimeOpen] = React.useState(false);
    const [updateCounter, update] = React.useState(0);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = currentSubReddit;
        }
    }, [currentSubReddit])

    const forceUpdate = () => update(updateCounter + 1);
    const subreddits = getSavedSubs();

    const subs = subreddits.map(sub => <li
        key={sub}
        className='sub'
        onClick={() => {
            dispatch({ type: 'SET_SUBREDDIT', payload: sub });
            setSubsOpen(false);
        }}
    >
        <span className={currentSubReddit === sub ? 'selected' : ''}>r/{sub}</span>
    </li>);

    const sorts = Object.keys(sortTypes).map(key => <li
        key={key}
        className='sort'
        onClick={() => {
            dispatch({ type: 'SET_SORT', payload: key });
            setSortOpen(false);
        }}
    >
        <span className={sort === key ? 'selected' : ''}>{sortTypes[key]}</span>
    </li>)

    const timeFrames = Object.keys(timeFrameTypes).map(key => <li
        key={key}
        className='time'
        onClick={() => {
            dispatch({ type: 'SET_TIMEFRAME', payload: key });
            setTimeOpen(false);
        }}
    >
        <span className={timeFrame === key ? 'selected' : ''}>{timeFrameTypes[key]}</span>
    </li>)

    const showTimeFrames = ['top', 'controversial'].includes(sort);
    const isSavedSubReddit = subreddits.includes(currentSubReddit);
    const toggleSaveSubreddit = () => {
        isSavedSubReddit
            ? deleteSavedSubReddit(currentSubReddit)
            : saveSubReddit(currentSubReddit);
        forceUpdate();
    }

    return (
        <div
            className='FeedSelector'
            onMouseLeave={() => {
                setSubsOpen(false);
                setSortOpen(false);
                setTimeOpen(false);
            }}
        >
            <div className="selectors">
                <div
                    className={isSubsOpen ? 'open' : ''}
                    onMouseEnter={() => {
                        setSubsOpen(true);
                        setSortOpen(false);
                        setTimeOpen(false);
                    }}>
                    <p>
                        <button
                            onClick={toggleSaveSubreddit}
                            title={(isSavedSubReddit ? 'Remove from' : 'Add to') + ' favourites'}
                        >
                            {isSavedSubReddit ? '-' : '+'}
                        </button>
                        r/
                        <input
                            ref={inputRef}
                            type="text"
                            name="subReddit"
                            id="subRedditInput"
                            defaultValue={currentSubReddit}
                            onBlur={(event) => {
                                dispatch({ type: 'SET_SUBREDDIT', payload: event.currentTarget.value });
                            }}
                            onKeyDown={(event) => {
                                if (event.keyCode == 13) {
                                    dispatch({ type: 'SET_SUBREDDIT', payload: event.currentTarget.value })
                                }
                            }}
                        />
                    </p>
                </div>
                <div
                    className={isSortOpen ? 'open' : ''}
                    onMouseEnter={() => {
                        setSubsOpen(false);
                        setSortOpen(true);
                        setTimeOpen(false);
                    }}>
                    <p>{sort}</p>
                </div>
                {showTimeFrames && <div
                    className={isTimeOpen ? 'open' : ''}
                    onMouseEnter={() => {
                        setSubsOpen(false);
                        setSortOpen(false);
                        setTimeOpen(true);
                    }}>
                    <p>{timeFrame}</p>
                </div>}
            </div>
            {isSubsOpen ? <div className='list subs' onMouseLeave={() => {
                setSubsOpen(false);
            }}>
                <ul>
                    {subs.length ? subs : 'You have no saved subreddits.'}
                </ul>
            </div> : null}
            {isSortOpen ? <div className='list sort' onMouseLeave={() => {
                setSortOpen(false);
            }}>
                <ul>
                    {sorts}
                </ul>
            </div> : null}
            {isTimeOpen ? <div className='list time' onMouseLeave={() => {
                setTimeOpen(false);
            }}>
                <ul>
                    {timeFrames}
                </ul>
            </div> : null}
        </div>
    );
}
