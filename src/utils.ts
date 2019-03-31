import { useEffect } from 'react';
import { LocalNotification, LocalNotificationScheduleResult, Plugins } from '@capacitor/core';

export function useBackButton(onBackButtonPressed: VoidFunction) {
	useEffect(() => {
		document.addEventListener('backbutton', onBackButtonPressed, false);

		return () => document.removeEventListener('backbutton', onBackButtonPressed, false);
	}, []);
}

export async function registerNotification(notification: LocalNotification): Promise<LocalNotificationScheduleResult | undefined> {
	if (Plugins.LocalNotifications) {
		if (await Plugins.LocalNotifications.areEnabled()) {
			/*const notification: LocalNotification = {
				title: 'Notification from Notedown',
				body: 'This is the notification body',
				id: 0,
				schedule: {
					at: new Date(Date.now() + 5000),
				},
			};*/
			const options = {
				notifications: [notification],
			};

			return Plugins.LocalNotifications.schedule(options);
		}
	}
}
