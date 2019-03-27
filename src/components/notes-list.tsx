import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import EmptyNotesList from './empty-notes-list';
import NoteListItem from './note-list-item';

import { useStore } from '../state/store';

const _NotesList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    padding: 8px 16px;
`;

const NotesList: FunctionComponent = () => {
    const notes = useStore(state => state.notes.items);

    if (notes.length === 0) {
        return (
            <EmptyNotesList />
        )
    }

    return (
        <_NotesList>
            {notes.map(note => (
                <NoteListItem note={note} />
            ))}
            {notes.map(note => (
                <NoteListItem note={note} />
            ))}
            {notes.map(note => (
                <NoteListItem note={note} />
            ))}
            {notes.map(note => (
                <NoteListItem note={note} />
            ))}
            {notes.map(note => (
                <NoteListItem note={note} />
            ))}
        </_NotesList>
    );
}

export default NotesList;
