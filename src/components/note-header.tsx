import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { IonButton, IonButtons, IonDatetime, IonHeader, IonIcon, IonToolbar } from '@ionic/react';
import { LocalNotification, Plugins } from '@capacitor/core';
import { RouteComponentProps, withRouter } from 'react-router';

import { useActions, useStore } from '../state/store';
import { List, Text } from '../state/notes';
import { registerNotification } from '../utils';

type RouteParams = { noteId: string };

type Props = { note: Text | List } & RouteComponentProps<RouteParams>;

// helper to add the timezone difference in the ISO string
function getDateISOString(date: Date): string {
	const tzo = -date.getTimezoneOffset();
	const dif = tzo >= 0 ? '+' : '-';

	function pad(num: number): string {
		const norm = Math.floor(Math.abs(num));
		return (norm < 10 ? '0' : '') + norm;
	};

	return date.getFullYear() +
		'-' + pad(date.getMonth() + 1) +
		'-' + pad(date.getDate()) +
		'T' + pad(date.getHours()) +
		':' + pad(date.getMinutes()) +
		':' + pad(date.getSeconds()) +
		dif + pad(tzo / 60) +
		':' + pad(tzo % 60);
}

const NoteHeader: FunctionComponent<Props> = ({ history, match, note }) => {
	const notes = useStore(state => state.notes.items);
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

	const [shouldDisplayNotifyMeButton, setShouldDisplayNotifyMeButton] = useState(noteId !== 'new');
	useEffect(() => {
		async function setupNotifyMeButton(): Promise<void> {
			let areLocalNotificationsAvailable;
			try {
				areLocalNotificationsAvailable = Plugins.LocalNotifications && await Plugins.LocalNotifications.areEnabled();
			} catch (e) {
				areLocalNotificationsAvailable = false;
			}
			const shouldDisplay = Boolean(areLocalNotificationsAvailable) && notes.findIndex(item => item.id === note.id) > -1;

			setShouldDisplayNotifyMeButton(shouldDisplay);
		}

		setupNotifyMeButton();
	}, [notes]);

	const datetimeRef = useRef<HTMLIonDatetimeElement>(null);

	async function handleNotifyMeButton() {
		if (datetimeRef.current) {
			await datetimeRef.current.open();

			// ionic ne propose pas d'event handler pour le click sur "done", alors on force /shrug
			const ionApp = document.getElementsByTagName('ion-app')[0];
			const doneButton = ionApp.querySelector('ion-picker .picker-toolbar-button:not(.picker-toolbar-cancel)');
			if (doneButton) {
				const setReminder = () => {
					doneButton.removeEventListener('click', setReminder, false);

					const body = note.title ? `Take a look at "${note.title}"` : 'Take a look at your note';
					const at = datetimeRef.current && datetimeRef.current.value ? new Date(datetimeRef.current.value) : new Date();

					const notification: LocalNotification = {
						title: 'Notedown',
						body: body,
						id: 0,
						schedule: {
							at,
						},
						// infos à utiliser dans le listener de 'localNotificationActionPerformed'
						extra: {
							id: note.id,
							type: note.type,
						},
					};

					registerNotification(notification);
				};

				doneButton.addEventListener('click', setReminder, false);
			}
		}
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
							<>
								<IonButton onClick={handleNotifyMeButton}>
									<IonIcon icon="notifications" color="dark" mode="md" />
								</IonButton>
								<IonDatetime
									ref={datetimeRef}
									style={{ display: 'none' }}
									displayFormat="MMM DD, YYYY HH:mm"
									min={getDateISOString(new Date())}
									doneText="Remind me of this note"
								/>
							</>
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
