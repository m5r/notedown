import React, { FunctionComponent } from 'react';
import { IonButton, IonButtons, IonHeader, IonIcon, IonToolbar } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { RouteComponentProps, withRouter } from 'react-router';

import { useActions, useStore } from '../state/store';
import { List, NoteType, Text } from '../state/notes';

type RouteParams = { noteId: string };

type Props = { note: Text | List } & RouteComponentProps<RouteParams>;

const NoteHeader: FunctionComponent<Props> = ({ history, match, note }) => {
	const user = useStore(state => state.user.user);
	const fetchNotes = useActions(actions => actions.notes.fetchNotes);
	const deleteNote = useActions(actions => actions.notes.deleteNote);

	const { noteId } = match.params;

	function goBackToHome() {
		history.push('/home');

		if (user) {
			fetchNotes(user.uid);
		}
	}

	async function handleDeleteButtonClick() {
		if (Plugins.Modals) {
			const result = await Plugins.Modals.confirm({
				title: 'You are about to delete this note',
				message: 'Are you sure you want to delete it ?',
			});

			if (!result.value) {
				return;
			}
		}

		history.replace('/home');
		deleteNote(note.id);
	}

	const shouldDisplayNotifyMeButton = noteId !== 'new' ||
		(
			(note.type === NoteType.Text && note.content !== '') ||
			(note.type === NoteType.List && note.items.length > 0 && note.items[0].content !== '')
		);

	function handleNotifyMeButton() {

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
					{
						shouldDisplayNotifyMeButton && (
							<IonButton onClick={handleNotifyMeButton}>
								<IonIcon icon="notifications" color="dark" mode="md" />
							</IonButton>
						)
					}
					<IonButton onClick={handleDeleteButtonClick}>
						<IonIcon icon="trash" color="dark" mode="md" />
					</IonButton>
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	);
};

export default withRouter(NoteHeader);
