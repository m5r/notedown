import { RefObject, useEffect } from 'react';
import { HapticsImpactStyle, LocalNotification, LocalNotificationScheduleResult, Plugins } from '@capacitor/core';

import { NoteType } from './state/notes';

export function useBackButton(onBackButtonPressed: VoidFunction) {
	useEffect(() => {
		document.addEventListener('backbutton', onBackButtonPressed, false);

		return () => document.removeEventListener('backbutton', onBackButtonPressed, false);
	}, []);
}

async function areNotificationsAvailable(): Promise<boolean> {
	try {
		if (!Plugins.LocalNotifications) {
			return false;
		}

		const { value } = await Plugins.LocalNotifications.areEnabled();

		return value;

	} catch (e) {
		return false;
	}
}

type NotificationExtra = {
	id: string;
	type: NoteType;
};

// Pas réussi à se servir des extras pour afficher directement la page de la note dont on vient d'etre notifié
const pendingNotification = { current: null };

export async function useNotifications(): Promise<RefObject<NotificationExtra | null>> {
	if (await areNotificationsAvailable()) {
		Plugins.LocalNotifications!.addListener('localNotificationActionPerformed', (n) => {
			const notification = n.notificationRequest as LocalNotification;
			// const noteTypeRoute = extra.type === NoteType.Text ? 'note' : 'list';
			// const path = `/${noteTypeRoute}/${extra.id}`;

			pendingNotification.current = notification.extra;
		});
	}

	return pendingNotification;
}

export async function registerNotification(notification: LocalNotification): Promise<LocalNotificationScheduleResult | undefined> {
	if (await areNotificationsAvailable()) {
		const options = {
			notifications: [notification],
		};

		return Plugins.LocalNotifications!.schedule(options);
	}
}

export function vibrationFeedback() {
	if (Plugins.Haptics) {
		Plugins.Haptics.impact({ style: HapticsImpactStyle.Light });
	}
}
