import { useEffect } from 'react';

export const useBackButton = (onBackButtonPressed: () => void) => {
	useEffect(() => {
		document.addEventListener('backbutton', onBackButtonPressed, false);

		return () => document.removeEventListener('backbutton', onBackButtonPressed, false);
	}, []);
};
