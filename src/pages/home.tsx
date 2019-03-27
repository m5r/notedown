import React, { FunctionComponent, useEffect } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

import Loading from '../components/loading';

import { useAuthentication } from '../firebase/hooks';
import { useActions, useStore } from '../state/store';
import NotesList from '../components/notes-list';

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

	const fetchNotes = useActions(actions => actions.notes.fetchNotes);

	const user = useStore(state => state.user.user);
	const isFetching = useStore(state => state.notes.isFetching);

	const isLoading = !user || isFetching;

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
				{
					isLoading ? 
					<Loading /> :
					<NotesList />
				}
			</IonContent>
		</>
	);
};

export default Home;
