import React, { FunctionComponent, useEffect } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import styled from 'styled-components';

import NotesList from '../components/notes-list';
import HomeFooter from '../components/home-footer';

import { useAuthentication } from '../firebase/hooks';
import { useActions, useStore } from '../state/store';

// HALF-DONE: liste des notes sous forme de masonry
// DONE: footer avec "Take a note..."
// TODO: créer une note
// TODO: modifier une note
// TODO: swipe left/right les notes pour les supprimer
// DONE: footer avec "☑"
// TODO: créer une liste
// TODO: toggle switch format masonry/liste
// TODO: recherche

const _Home = styled.div`
	display: flex;
    height: 100%;
    flex-direction: column;
`;

const Home: FunctionComponent = () => {
	useAuthentication();

	const user = useStore(state => state.user.user);
	const fetchNotes = useActions(actions => actions.notes.fetchNotes);

	useEffect(() => {
		if (!user) {
			return;
		}

		fetchNotes(user.uid);
	}, [user]);

	return (
		<>
			<IonHeader>
				<IonToolbar>
					<IonTitle>
						Notedown
					</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent
				forceOverscroll={false}
			>
				<_Home>
					<NotesList />
					{!!user && <HomeFooter />}
				</_Home>
			</IonContent>
		</>
	);
};

export default Home;
