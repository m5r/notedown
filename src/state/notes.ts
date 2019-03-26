import { Action, action } from 'easy-peasy';

export enum NoteType {
	List = 'list',
	Note = 'note',
}

export type Note = {
	id: string;
	type: NoteType;
	title: string;
	content: string;
};

export type NotesModel = {
	items: Note[];
	add: Action<NotesModel, Note>
}

const notes: NotesModel = {
	items: [],
	add: action((state, payload) => {
		state.items.push(payload);
	}),
};

export default notes;
