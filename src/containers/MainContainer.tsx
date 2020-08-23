import React from 'react'

import FeedList from '../components/FeedList'
import FeedSelector from '../components/FeedSelector'
import Page from '../components/Page'

export default function MainContainer() {
    return (
        <div className="grid" >
            <div className="FeedContainer">
                <FeedSelector />
                <FeedList />
            </div>
            <div className="PageContainer">
                <Page />
            </div>
        </div>
    )
};
