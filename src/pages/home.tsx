import React, { FunctionComponent } from 'react';

import useAuthentication from '../firebase/hooks';

const Home: FunctionComponent = () => {
	useAuthentication();

	return (
		<div>
			Home
		</div>
	);
};

export default Home;
