import { Action, Thunk, Select, action, thunk, select } from 'easy-peasy';
import Firebase from 'firebase/app';

import firebaseService from '../firebase';

export enum NoteType {
	List = 'list',
	Note = 'note',
}

type FirebaseTimestamp = Firebase.firestore.FieldValue;

export type Note = {
	id: string;
	owner: string;
	type: NoteType;
	title: string;
	content: string;

	lastModifiedAt: FirebaseTimestamp;
	createdAt: FirebaseTimestamp;
};

export type NotesModel = {
	items: Note[];
	isFetching: boolean;

	fetchNotes: Thunk<NotesModel, string>;
	setNotes: Action<NotesModel, Note[]>;
	setIsFetching: Action<NotesModel, boolean>;
	setNote: Action<NotesModel, Note>;
	deleteNote: Action<NotesModel, string>;
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
		console.log('notes', notes);
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
	setNote: action((state, payload) => {
		const currentNoteIndex = state.items.findIndex(item => item.id === payload.id);

		const note = {
			...payload,
			lastModifiedAt: Firebase.firestore.FieldValue.serverTimestamp(),
		}

		if (currentNoteIndex === -1) {
			// new note
			const nextItems = [...state.items, note];
			firebaseService.setNote(note);

			return {
				...state,
				items: nextItems,
			};
		}

		const nextItems = [...state.items];
		nextItems[currentNoteIndex] = note;

		firebaseService.setNote(note);

		return {
			...state,
			items: nextItems,
		};
	}),
	deleteNote: action((state, noteId) => {
		const nextItems = state.items.filter(item => item.id !== noteId);

		firebaseService.deleteNote(noteId);

		return {
			...state,
			items: nextItems,
		};
	}),
};

export default notes;
