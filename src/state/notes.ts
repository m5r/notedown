import { Action, Thunk, Select, action, thunk, select } from 'easy-peasy';

import firebaseService from '../firebase';

export enum NoteType {
	List = 'list',
	Note = 'note',
}

export type Note = {
	id: string;
	owner: string;
	type: NoteType;
	title: string;
	content: string;
};

export type NotesModel = {
	items: Note[];
	isFetching: boolean;

	fetchNotes: Thunk<NotesModel, string>;
	setNotes: Action<NotesModel, Note[]>;
	setNote: Action<NotesModel, Note>;
	setIsFetching: Action<NotesModel, boolean>;
}

const notes: NotesModel = {
	items: [],
	isFetching: false,
	fetchNotes: thunk(async (actions, userUid, { getState }) => {
		if (getState().isFetching) {
			return;
		}

		actions.setIsFetching(true);

		const notes = await firebaseService.fetchNotes(userUid);
		actions.setNotes(Array(20).fill(true).map((vide, index) => notes[index % notes.length]));

		actions.setIsFetching(false);
	}),
	setNotes: action((state, payload) => ({
		...state,
		items: payload,
	})),
	setIsFetching: action((state, payload) => ({
		...state,
		isFetching: payload,
	})),
	setNote: action((state, payload) => {
		const currentNoteIndex = state.items.findIndex(item => item.id === payload.id);

		if (currentNoteIndex === -1) {
			// new note
			const nextItems = [...state.items, payload];
			firebaseService.setNote(payload);

			return {
				...state,
				items: nextItems,
			};
		}

		const nextItems = [...state.items];
		nextItems[currentNoteIndex] = payload;

		firebaseService.setNote(payload);

		return {
			...state,
			items: nextItems,
		};
	}),
};

export default notes;
