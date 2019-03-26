import React, { FunctionComponent } from 'react';

import useAuthentication from '../firebase/hooks';

// TODO: liste des notes sous forme de masonry
// TODO: footer avec "Take a note..."
// TODO: créer une note
// TODO: swipe left/right les notes pour les supprimer
// TODO: footer avec "☑"
// TODO: créer une liste
// TODO: toggle switch format masonry/liste
// TODO: recherche

const Home: FunctionComponent = () => {
	useAuthentication();

	return (
		<div>
			Home
		</div>
	);
};

export default Home;
