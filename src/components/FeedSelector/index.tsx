import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';

const subreddits = [
    'all',
    'pathofexile',
    'rule34',
    'Rule34Overwatch',
    'AzerothPorn',
    'rule34gifs',
    'Overwatch_Porn'
];
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
    const subReddit = useSelector((state: State) => state.subReddit);
    const sort = useSelector((state: State) => state.sort);
    const timeFrame = useSelector((state: State) => state.timeFrame);
    const [isSubsOpen, setSubsOpen] = React.useState(false);
    const [isSortOpen, setSortOpen] = React.useState(false);
    const [isTimeOpen, setTimeOpen] = React.useState(false);
    const dispatch = useDispatch();

    const subs = subreddits.map(sub => <li
        key={sub}
        className='sub'
        onClick={() => {
            dispatch({ type: 'SET_SUBREDDIT', payload: sub });
            setSubsOpen(false);
        }}
    >
        <span className={subReddit === sub ? 'selected' : ''}>r/{sub}</span>
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
                    <p>r/{subReddit}</p>
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
            {isSubsOpen ? <div className='list' onMouseLeave={() => {
                setSubsOpen(false);
            }}>
                <ul>
                    {subs}
                </ul>
            </div> : null}
            {isSortOpen ? <div className='list' onMouseLeave={() => {
                setSortOpen(false);
            }}>
                <ul>
                    {sorts}
                </ul>
            </div> : null}
            {isTimeOpen ? <div className='list' onMouseLeave={() => {
                setTimeOpen(false);
            }}>
                <ul>
                    {timeFrames}
                </ul>
            </div> : null}
        </div>
    );
}
