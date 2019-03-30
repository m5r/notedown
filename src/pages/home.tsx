import React, { FunctionComponent } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import styled from 'styled-components';

import NotesList from '../components/notes-list';
import HomeFooter from '../components/home-footer';

import { useAuthentication } from '../firebase/hooks';
import { useStore } from '../state/store';

// DONE: liste des notes sous forme de masonry
// DONE: footer avec "Take a note..."
// DONE: créer une note
// DONE: modifier une note
// HALF-DONE: swipe left/right les notes pour les supprimer
// DONE: footer avec "☑"
// TODO: créer une liste
// TODO: toggle switch format masonry/liste
// TODO: recherche

// TODO: nicer fonts
// TODO: app icon
// TODO: app launcher
// TODO: pages transitions

const _Home = styled.div`
	display: flex;
    height: 100%;
    flex-direction: column;
`;

const Home: FunctionComponent = () => {
	useAuthentication();

	const user = useStore(state => state.user.user);

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
