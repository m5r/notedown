import React, { FunctionComponent, useEffect, useReducer, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import uuidv4 from 'uuid/v4';
import { IonContent } from '@ionic/react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import Firebase from 'firebase/app';

import Loading from '../components/loading';

import { useStore, useActions } from '../state/store';
import { useAuthentication } from '../firebase/hooks';

import NoteHeader from '../components/note-header';
import { Note, NoteType } from '../state/notes';

type RouteParams = {
    noteId: string;
};

const _Note = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 75px 1fr;
`;

const NoteTitle = styled.input`
    color: #80868b;
    letter-spacing: .01785714em;
    font-size: 1.175rem;
    font-weight: 500;
    line-height: 1.25rem;
    border: none;
    padding: 16px;
    width: 100%;
    outline: none;
`;

const NoteContent = styled.textarea`
    color: #80868b;
    letter-spacing: .01785714em;
    font-size: 0.975rem;
    font-weight: 500;
    line-height: 1.25rem;
    border: none;
    padding: 0 16px 16px;
    width: 100%;
    outline: none;
`;

enum ActionType {
    updateTitle = 'updateTitle',
    updateContent = 'updateContent',
    updateUserId = 'updateUserId',
    overrideNote = 'overrideNote',
};

type Action = {
    type: ActionType.updateContent | ActionType.updateTitle | ActionType.updateUserId;
    payload: string;
} | {
    type: ActionType.overrideNote,
    payload: Note,
}

const NotePage: FunctionComponent<RouteComponentProps<RouteParams>> = ({ history, match }) => {
    useAuthentication();

    const contentRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.focus();
        }
    }, [contentRef.current]);

    const setNote = useActions(actions => actions.notes.setNote);
    const setNoteRef = useRef<typeof setNote | null>(null);
    if (!setNoteRef.current) {
        setNoteRef.current = debounce(setNote, 350);
    }
    const debouncedSetNote = setNoteRef.current;

    function reducer(note: Note, action: Action): Note {
        let updatedNote: Note;

        switch (action.type) {
            case ActionType.updateTitle:
                updatedNote = {
                    ...note,
                    title: action.payload,
                };
                break;
            case ActionType.updateContent:
                updatedNote = {
                    ...note,
                    content: action.payload,
                };
                break;
            case ActionType.updateUserId:
                updatedNote = {
                    ...note,
                    owner: action.payload,
                };
                return updatedNote;
            case ActionType.overrideNote:
                return action.payload;
            default:
                throw new Error();
        }

        debouncedSetNote(updatedNote);
        return updatedNote;
    }

    const { noteId } = match.params;
    const id = noteId === 'new' ?
        uuidv4() :
        noteId;
    const notes = useStore(state => state.notes.items);
    const user = useStore(state => state.user.user);

    // peut servir quand le user ouvre l'app directement à cette page
    const isFetching = useStore(state => state.notes.isFetching);

    const noteFromState = notes.find(n => n.id === noteId);
    const initialState: Note = noteId === 'new' ?
        {
            id,
            owner: user ? user.uid : '',
            type: NoteType.Note,
            content: '',
            title: '',

            createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
            lastModifiedAt: Firebase.firestore.FieldValue.serverTimestamp(),
        } :
        noteFromState!;

    const [note, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (noteId === 'new' && user) {
            dispatch({ type: ActionType.updateUserId, payload: user.uid })
        }
    }, [user]);

    useEffect(() => {
        if (noteId !== 'new' && !!noteFromState) {
            dispatch({ type: ActionType.overrideNote, payload: noteFromState })
        }
    }, [noteFromState]);

    if (!user || isFetching || !note) {
        return (
            <Loading />
        );
    }

    if (noteId === 'new') {
        return (
            <>
                <NoteHeader />

                <IonContent
                    forceOverscroll={false}
                >
                    <_Note>
                        <NoteTitle
                            placeholder="Title"
                            value={note.title}
                            onChange={e => dispatch({ type: ActionType.updateTitle, payload: e.target.value })}
                        />
                        <NoteContent
                            ref={contentRef}
                            placeholder="Take a note..."
                            value={note.content}
                            onChange={e => dispatch({ type: ActionType.updateContent, payload: e.target.value })}
                        />
                    </_Note>
                </IonContent>
            </>
        )
    }

    if (!noteFromState) {
        history.replace('/home');
        return null;
    }

    return (
        <>
            <NoteHeader />

            <IonContent
                forceOverscroll={false}
            >
                <_Note>
                    <NoteTitle
                        placeholder="Title"
                        value={note.title}
                        onChange={e => dispatch({ type: ActionType.updateTitle, payload: e.target.value })}
                    />
                    <NoteContent
                        ref={contentRef}
                        placeholder="Take a note..."
                        value={note.content}
                        onChange={e => dispatch({ type: ActionType.updateContent, payload: e.target.value })}
                    />
                </_Note>
            </IonContent>
        </>
    )
}

export default NotePage;
