import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Loading from './loading';
import EmptyNotesList from './empty-notes-list';
import NoteListItem from './note-list-item';
import BottomFade from './bottom-fade';

import { useStore } from '../state/store';

const _NotesList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 6px));
    grid-template-rows: max-content;
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    padding: 16px 16px 32px;
    overflow-y: auto;
    flex: 1;
    padding-bottom: 30px;
`;

const NotesList: FunctionComponent = () => {
	const user = useStore(state => state.user.user);
	const isFetching = useStore(state => state.notes.isFetching);
	const notes = useStore(state => state.notes.items);
	const isLoading = !user || isFetching;

	if (isLoading) {
		return (
			<Loading />
		);
	}

	if (notes.length === 0) {
		return (
			<_NotesList>
				<EmptyNotesList />
			</_NotesList>
		);
	}

	return (
		<_NotesList>
			{notes.map(note => (
				<NoteListItem key={note.id} note={note} />
			))}
			<BottomFade />
		</_NotesList>
	);
};

export default NotesList;
