import React from 'react';

const msPerMinute = 60 * 1000;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;
const msPerMonth = msPerDay * 30;
const msPerYear = msPerDay * 365;

interface Props {
    className?: string,
    timestamp: number,
}

export default function Timestamp(props: Props) {
    const timestamp = props.timestamp * 1000;

    const relative = getRelativeTime(timestamp);
    if (relative) {
        return <span className={props.className}>{relative}</span>;
    }

    const date = new Date(timestamp).toDateString();
    const time = new Date(timestamp).toLocaleTimeString();
    return <span className={props.className}>{date} {time}</span>;
}

function getRelativeTime(timestamp: number) {
    const elapsed = Date.now() - timestamp;

    const getRelative = (unit: string, denominator: number) => {
        const round = Math.round(elapsed / denominator);
        const s = round > 1 ? 's' : '';
        return round + ` ${unit}${s} ago`;
    }

    if (elapsed < msPerMinute) {
        return 'just now';
    }
    else if (elapsed < msPerHour) {
        return getRelative('minute', msPerMinute);
    }
    else if (elapsed < msPerDay) {
        return getRelative('hour', msPerHour);
    }
    else if (elapsed < 30 * msPerDay) {
        return getRelative('day', msPerDay);
    }
    else if (elapsed < 12 * msPerMonth) {
        return getRelative('month', msPerMonth);
    }
    else if (elapsed < 12 * msPerYear) {
        return getRelative('year', msPerYear);
    }

    return false;
}
