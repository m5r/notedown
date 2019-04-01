import React, { FunctionComponent } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import styled from 'styled-components';

import NotesList from '../components/notes-list';
import HomeFooter from '../components/home-footer';

import { useAuthentication } from '../firebase/hooks';
import { useStore } from '../state/store';
import { Link } from 'react-router-dom';

// DONE: liste des notes sous forme de masonry
// DONE: footer avec "Take a note..."
// DONE: créer une note
// DONE: modifier une note
// TODO: swipe left/right les notes pour les supprimer
// DONE: footer avec "☑"
// DONE: liste des listes
// DONE: créer une liste
// DONE: modifier une liste
// TODO: recherche
// TODO: speech to text
// DONE: notification rappel (date précise ou "dans 1 jour"?)

// DONE: nicer fonts
// DONE: login/signup feedback (loading animation)
// TODO: app icon
// TODO: app launcher
// TODO???: pages transitions
// TODO???: cancel/redo

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
					<IonButtons slot="end">
						<Link to="/logout">
							<IonButton color="dark">
								<IonIcon name="log-out" />
							</IonButton>
						</Link>
					</IonButtons>
				</IonToolbar>
			</IonHeader>

			<IonContent
				forceOverscroll={false}
			>
				<_Home>
					<NotesList />
					{Boolean(user) && <HomeFooter />}
				</_Home>
			</IonContent>
		</>
	);
};

export default Home;
