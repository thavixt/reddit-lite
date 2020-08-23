import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Reddit from './api'
import Loading from './components/Loading'
import MainContainer from './containers/MainContainer'
import { getQueryParam } from './utils'

const App: React.FC = () => {
    const dispatch = useDispatch();
    const post = useSelector((state: State) => state.post);
    const sub = useSelector((state: State) => state.subReddit);
    const [hasCreatedAPIInstance, setHasCreatedAPIInstance] = useState(false);

    const loadPostFromUrl = useCallback(async () => {
        if (post && typeof post === "object") {
            document.title = post.title;
        }
        else if (sub) {
            document.title = `r/${sub}`;
        }

        const postQuery = getQueryParam('post');
        if (postQuery && !post && sub) {
            const post = await Reddit.post(sub, postQuery);
            const postObject = post.length ? post[0].data.children[0].data : null;
            if (postObject) {
                dispatch({
                    type: 'SET_POST',
                    payload: postObject,
                });
            }
        }
    }, [dispatch, post, sub]);

    useEffect(() => {
        Reddit.auth()
            .then(() => new Promise((resolve) => {
                setTimeout(resolve, 1000);
            }))
            .then(() => setHasCreatedAPIInstance(true))
            .then(loadPostFromUrl);
    }, [loadPostFromUrl]);

    useEffect(() => {
        if (post && typeof post === "object") {
            document.title = post.title;
        }
        else if (sub) {
            document.title = `r/${sub}`;
        }

        const loadPost = async (subReddit: string, id: string) => {
            const post = await Reddit.post(subReddit, id);
            const postObject = post.length ? post[0].data.children[0].data : null;
            if (postObject) {
                dispatch({
                    type: 'SET_POST',
                    payload: postObject,
                });
            }
        }
        const postQuery = getQueryParam('post');
        if (postQuery && !post && sub) {
            loadPost(sub, postQuery);
        }
    }, [dispatch, post, sub]);

    return (
        <div className="App">
            {
                hasCreatedAPIInstance ? <>
                    <MainContainer />
                </> :
                    <div className="full center">
                        <Loading size="huge" />
                    </div>
            }
        </div>
    )
}

export default App;
