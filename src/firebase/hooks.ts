import { useContext, useEffect } from 'react';
import useReactRouter from 'use-react-router';

import FirebaseContext from './context';
import { useActions } from '../state/store';

const useAuthentication = () => {
	const firebase = useContext(FirebaseContext);
	const setUser = useActions(actions => actions.user.setUser);
	const { history } = useReactRouter();

	useEffect(() => firebase.auth.onAuthStateChanged(((user) => {
		console.log('user', user);

		if (user) {
			setUser(user);
			return history.replace('/home');
		}

		if (
			location.pathname !== '/login' &&
			location.pathname !== '/signup'
		) {
			history.replace('/');
		}
	})), [history]);
};

export default useAuthentication;
