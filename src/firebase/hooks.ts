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

		if (firebase.auth.currentUser) {
			if (stateNotes.length === 0) {
				fetchNotes(firebase.auth.currentUser.uid);
			}

			if (!stateUser) {
				setUser(firebase.auth.currentUser);
			}

			if (location.pathname === '/') {
				history.replace('/home');
			}

			return;
		}

		if (!initialising && !firebase.auth.currentUser) {
			try {
				if (Plugins.SplashScreen) {
					Plugins.SplashScreen.hide();
				}
			} catch (e) {
				console.info('The SplashScreen plugin is not available');
			}

			if (
				location.pathname !== '/login' &&
				location.pathname !== '/signup'
			) {
				history.replace('/');
			}
		}
	}, [firebase.auth.currentUser, initialising]);
};
