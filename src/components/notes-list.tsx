import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import LoadingList from './loading-list';
import EmptyNotesList from './empty-notes-list';
import NoteListItem from './note-list-item';
import BottomFade from './bottom-fade';

import { useStore } from '../state/store';
import { Note } from '../state/notes';

const _NotesList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 6px));
    grid-column-gap: 8px;
    padding: 16px 16px 32px;
    overflow-y: auto;
    flex: 1;
    padding-bottom: 30px;
`;

const Column = styled.section`
	display: grid;
	grid-template-rows: max-content;
    grid-row-gap: 8px;
    align-content: flex-start;
`;

type NotesColumns = {
	left: Note[];
	right: Note[];
};

const NotesList: FunctionComponent = () => {
	const user = useStore(state => state.user.user);
	const isFetching = useStore(state => state.notes.isFetching);
	const notes = useStore(state => state.notes.items);
	const isLoading = !user || isFetching;

	if (isLoading) {
		return (
			<LoadingList />
		);
	}

	if (notes.length === 0) {
		return (
			<EmptyNotesList />
		);
	}

	const { left, right } = notes.reduce<NotesColumns>((columns, note, index) => {
		if (index % 2 === 0) {
			return {
				left: [...columns.left, note],
				right: columns.right,
			};
		}

		return {
			left: columns.left,
			right: [...columns.right, note],
		};
	}, { left: [], right: [] });

	return (
		<_NotesList>
			<Column>
				{left.map(note => (
					<NoteListItem key={note.id} note={note} />
				))}
			</Column>

			<Column>
				{right.map(note => (
					<NoteListItem key={note.id} note={note} />
				))}
			</Column>
			<BottomFade />
		</_NotesList>
	);
};

export default NotesList;
