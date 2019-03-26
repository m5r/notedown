import React, { FunctionComponent, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import FirebaseContext from '../firebase/context';
import { useActions } from '../state/store';

const Logout: FunctionComponent = () => {
	const firebase = useContext(FirebaseContext);
	const setUser = useActions(actions => actions.user.setUser);

	firebase.logOut();
	setUser(null);

	return (
		<Redirect to='/' />
	);
};

export default Logout;
