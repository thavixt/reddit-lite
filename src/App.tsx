import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import MainContainer from './containers/MainContainer'
import LoadingAnimation from './components/LoadingAnimation'

import Reddit from './api'

const App: React.FC = () => {
	const post = useSelector((state: State) => state.post);
	const subReddit = useSelector((state: State) => state.subReddit);

	const [hasCreatedAPIInstance, setHasCreatedAPIInstance] = useState(false);

	useEffect(() => {
		Reddit.auth()
			.then(() => new Promise((resolve) => {
				setTimeout(resolve, 1000);
			}))
			.then(() => setHasCreatedAPIInstance(true));
	}, []);

	useEffect(() => {
		if (post && post.title) {
			document.title = post.title;
		}
		else if (subReddit) {
			document.title = `r/${subReddit}`;
		}
	}, [post, subReddit]);

	return (
		<div className="App">
			{hasCreatedAPIInstance ? <>
				<MainContainer />
			</> :
				<div className="full center">
					<LoadingAnimation size="huge" />
				</div>
			}
		</div>
	)
}

export default App;
