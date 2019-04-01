import React, { FunctionComponent } from 'react';
import { IonButton, IonButtons, IonHeader, IonIcon, IonToolbar } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';

import { useActions, useStore } from '../state/store';
import { List, Text } from '../state/notes';

type RouteParams = { noteId: string };

type Props = { note: Text | List } & RouteComponentProps<RouteParams>;

const NoteHeader: FunctionComponent<Props> = ({ history, match, note }) => {
	const user = useStore(state => state.user.user);
	const fetchNotes = useActions(actions => actions.notes.fetchNotes);
	const deleteNote = useActions(actions => actions.notes.deleteNote);

	function goBackToHome() {
		history.push('/home');

		if (user) {
			fetchNotes(user.uid);
		}
	}

	function handleDeleteButtonClick() {
		if (match.params.noteId !== 'new') {
			deleteNote(match.params.noteId);
		}

		history.push('/home');
	}

	return (
		<IonHeader>
			<IonToolbar class="header-toolbar">
				<IonButtons slot="start">
					<IonButton
						class="header-back-button"
						onClick={goBackToHome}
					>
						<IonIcon icon="arrow-back" color="dark" mode="md" />
					</IonButton>
				</IonButtons>
				<IonButtons slot="end">
					<IonButton onClick={handleDeleteButtonClick}>
						<IonIcon icon="trash" color="dark" mode="md" />
					</IonButton>
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	);
};

export default withRouter(NoteHeader);
