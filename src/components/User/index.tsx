import React, { useEffect, useState } from 'react';
import Snoowrap from 'snoowrap';

import Reddit from '../../api';
import LoadingAnimation from '../LoadingAnimation';

export default function () {
    const [instanceExists, setInstanceExists] = useState(false);
    const [user, setUser] = useState<Snoowrap.RedditUser | null>(null);

    useEffect(() => {
        (async () => {
            const inst = await Reddit.getInstance();
            setInstanceExists(true);

            Reddit.getUser()
                .then(setUser);
        })();
    }, [])

    const authenticated = instanceExists ? Reddit.isAuthenticated() : false;
    const isLoggedIn = instanceExists && authenticated;

    const userBlock = (isLoggedIn && user) ? <div className="user">
        <span className="userKarma">{user.comment_karma} karma</span>
        <span className="userName">{user.name}</span>
        <img className="userIcon" src={user.icon_img} alt="User profile image" />
    </div> : (authenticated ? (
        <LoadingAnimation size="small" />
    ) : null)

    return (
        <div className="User">
            {isLoggedIn ?
                <button className="logout" onClick={Reddit.logout}>Log out</button>
                : <button className="login" onClick={Reddit.redirectAuth}>Log in</button>
            }
            {userBlock}
        </div>
    )
} 
