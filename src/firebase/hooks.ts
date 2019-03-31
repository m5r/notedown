import { useContext, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { useAuthState } from 'react-firebase-hooks/auth';

import FirebaseServiceContext from './context';
import { useActions, useStore } from '../state/store';
import { Plugins } from '@capacitor/core';

export const useAuthentication = () => {
	const firebase = useContext(FirebaseServiceContext);
	const stateUser = useStore(state => state.user.user);
	const stateNotes = useStore(state => state.notes.items);
	const setUser = useActions(actions => actions.user.setUser);
	const fetchNotes = useActions(actions => actions.notes.fetchNotes);
	const { history } = useReactRouter();

	const { initialising, user } = useAuthState(firebase.auth);

	useEffect(() => {
		if (initialising) {
			return;
		}

		if (user) {
			if (stateNotes.length === 0) {
				fetchNotes(user.uid);
			}

			if (!stateUser) {
				setUser(user);
			}

			if (location.pathname === '/') {
				history.replace('/home');
			}

			return;
		}

		if (!initialising && !user) {
			if (Plugins.SplashScreen) {
				Plugins.SplashScreen.hide();
			}

			if (
				location.pathname !== '/login' &&
				location.pathname !== '/signup'
			) {
				history.replace('/');
			}
		}
	}, [user, initialising]);
};
