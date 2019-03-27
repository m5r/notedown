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
		actions.setNotes(notes);

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
};

export default notes;
