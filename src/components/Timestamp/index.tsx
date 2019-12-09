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

    if (elapsed < msPerMinute) {
        return 'just now';
    }

    else if (elapsed < msPerHour) {
        const round = Math.round(elapsed / msPerMinute);
        const s = round > 1 ? 's' : '';
        return round + ` minute${s} ago`;
    }

    else if (elapsed < msPerDay) {
        const round = Math.round(elapsed / msPerHour);
        const s = round > 1 ? 's' : '';
        return round + ` hour${s} ago`;
    }

    else if (elapsed < 30 * msPerDay) {
        const round = Math.round(elapsed / msPerDay);
        const s = round > 1 ? 's' : '';
        return round + ` day${s} ago`;
    }

    else if (elapsed < 12 * msPerMonth) {
        const round = Math.round(elapsed / msPerMonth);
        const s = round > 1 ? 's' : '';
        return round + ` month${s} ago`;
    }

    else if (elapsed < 12 * msPerYear) {
        const round = Math.round(elapsed / msPerYear);
        const s = round > 1 ? 's' : '';
        return round + ` year${s} ago`;
    }

    return false;
}
