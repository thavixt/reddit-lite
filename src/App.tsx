import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import MainContainer from './containers/MainContainer'

const App: React.FC = () => {
	const post = useSelector((state: State) => state.post);
	const subReddit = useSelector((state: State) => state.subReddit);

	React.useEffect(() => {
		if (post) {
			document.title = post.title;
		}
		else if (subReddit) {
			document.title = `r/${subReddit}`;
		}
	}, [post, subReddit]);

	return (
		<div className="App">
			<MainContainer />
		</div>
	);
}

export default App;
