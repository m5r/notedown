import { Plugins } from '@capacitor/core';
import { Action, Thunk, action, thunk } from 'easy-peasy';
import Firebase from 'firebase/app';

import firebaseService from '../firebase';

export enum NoteType {
	List = 'list',
	Text = 'text',
}

type FirebaseTimestamp = Firebase.firestore.FieldValue;

type BaseNote = {
	id: string;
	owner: string;
	type: NoteType;
	title: string;

	lastModifiedAt: FirebaseTimestamp;
	createdAt: FirebaseTimestamp;
}

export type Text = BaseNote & {
	type: NoteType.Text;
	content: string;
};

export type ListItem = {
	id: string;
	content: string;
	isDone: boolean;
}

export type List = BaseNote & {
	type: NoteType.List;
	items: ListItem[];
}

export type Note = Text | List;

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
		actions.setNotes(notes);

		try {
			if (Plugins.SplashScreen) {
				Plugins.SplashScreen.hide();
			}
		} catch (e) {
			console.info('The SplashScreen plugin is not available');
		}

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
		};

		if (currentNoteIndex === -1) {
			// new note
			const nextItems = [note, ...state.items];
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
