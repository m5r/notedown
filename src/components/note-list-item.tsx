import React, { FunctionComponent } from 'react';

import NoteListItemText from './note-list-item-text';
import NoteListItemList from './note-list-item-list';

import { Note, NoteType } from '../state/notes';

type Props = {
	note: Note;
}

const NoteListItem: FunctionComponent<Props> = ({ note }) => {
	if (note.type === NoteType.Text) {
		return (
			<NoteListItemText note={note} />
		);
	}

	if (note.type === NoteType.List) {
		return (
			<NoteListItemList note={note} />
		);
	}

	// if the data got somehow corrupted, don't display it
	return null;
};

export default NoteListItem;
