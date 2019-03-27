import { useContext, useEffect } from 'react';
import useReactRouter from 'use-react-router';

import FirebaseServiceContext from './context';
import { useActions } from '../state/store';

export const useAuthentication = () => {
	const firebase = useContext(FirebaseServiceContext);
	const setUser = useActions(actions => actions.user.setUser);
	const fetchNotes = useActions(actions => actions.notes.fetchNotes);
	const { history } = useReactRouter();

	useEffect(() => firebase.auth.onAuthStateChanged(((user) => {
		if (user) {
			fetchNotes(user.uid);
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
