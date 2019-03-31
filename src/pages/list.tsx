import React, { FunctionComponent, useEffect, useReducer, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import uuidv4 from 'uuid/v4';
import { IonContent, IonIcon } from '@ionic/react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import Firebase from 'firebase/app';

import Loading from '../components/loading';
import NoteHeader from '../components/note-header';

import S from '../components/common';

import { useStore, useActions } from '../state/store';
import { useAuthentication } from '../firebase/hooks';
import { List, ListItem, NoteType } from '../state/notes';
import { useBackButton } from '../utils';
import ListItemComponent from '../components/list-item';

type RouteParams = {
	listId: string;
};

const _List = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 75px 1fr;
`;

const ListTitle = styled.input`
    &:placeholder {
    	color: #80868b;
	}
    color: #202124;
    letter-spacing: .01785714em;
    font-size: 1.175rem;
    font-weight: 500;
    line-height: 1.25rem;
    border: none;
    padding: 16px;
    width: 100%;
    outline: none;
`;

enum ActionType {
	updateTitle = 'updateTitle',
	addItem = 'addItem',
	removeItem = 'removeItem',
	updateItem = 'updateItem',
	updateUserId = 'updateUserId',
	overrideNote = 'overrideNote',
}

type Action = {
	type: ActionType.updateTitle | ActionType.updateUserId;
	payload: string;
} | {
	type: ActionType.overrideNote,
	payload: List,
} | {
	type: ActionType.addItem | ActionType.removeItem | ActionType.updateItem;
	payload: ListItem;
}

const _ListItem = styled.li`
    display: flex;
	align-items: center;
`;

const _DoneListItem = styled(_ListItem)`
	text-decoration: line-through;
	color: rgba(0,0,0,.54);
`;

const _AddListItem = styled(_ListItem)`
	color: #80868b;
`;

const ListItemContent = styled.textarea`
	border: none;
	outline: none;
`;

const NotePage: FunctionComponent<RouteComponentProps<RouteParams>> = ({ history, match }) => {
	useAuthentication();

	function onBackButtonPressed() {
		history.push('/home');
	}

	useBackButton(onBackButtonPressed);

	// const contentRef = useRef<HTMLTextAreaElement>(null);
	// useEffect(() => {
	// 	if (contentRef.current) {
	// 		contentRef.current.focus();
	// 	}
	// }, [contentRef.current]);

	const setNote = useActions(actions => actions.notes.setNote);
	const setNoteRef = useRef<typeof setNote | null>(null);
	if (!setNoteRef.current) {
		setNoteRef.current = debounce(setNote, 350, { trailing: true, leading: true });
	}
	const debouncedSetNote = setNoteRef.current;

	function reducer(list: List, action: Action): List {
		let updatedNote: List;

		switch (action.type) {
			case ActionType.updateTitle:
				updatedNote = {
					...list,
					title: action.payload,
				};
				break;
			case ActionType.addItem:
				updatedNote = {
					...list,
					items: [...list.items, action.payload],
				};
				break;
			case ActionType.removeItem:
				updatedNote = {
					...list,
					items: list.items.filter(item => item.id === action.payload.id),
				};
				break;
			case ActionType.updateItem:
				const updatedItems = [...list.items];
				const updatedItemIndex = updatedItems.findIndex(item => item.id === action.payload.id);
				updatedItems[updatedItemIndex] = action.payload;

				updatedNote = {
					...list,
					items: updatedItems,
				};
				break;
			case ActionType.updateUserId:
				updatedNote = {
					...list,
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

	const { listId } = match.params;
	const id = listId === 'new' ?
		uuidv4() :
		listId;
	const lists = useStore(state => state.notes.items);
	const user = useStore(state => state.user.user);

	// peut servir quand le user ouvre l'app directement à cette page
	const isFetching = useStore(state => state.notes.isFetching);

	const listFromState = lists.find(n => n.id === listId) as List;
	const initialState: List = listId === 'new' ?
		{
			id,
			owner: user ? user.uid : '',
			type: NoteType.List,
			items: [],
			title: '',

			createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
			lastModifiedAt: Firebase.firestore.FieldValue.serverTimestamp(),
		} :
		listFromState!;

	const [list, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (listId === 'new' && user) {
			dispatch({ type: ActionType.updateUserId, payload: user.uid });
		}
	}, [user]);

	useEffect(() => {
		if (listId !== 'new' && Boolean(listFromState)) {
			dispatch({ type: ActionType.overrideNote, payload: listFromState });
		}
	}, [listFromState]);

	if (!user || isFetching || !list) {
		return (
			<Loading />
		);
	}

	if (listId === 'new') {
		const itemsToDisplay: ListItem[] = [];
		// focus only here

		return (
			<>
				<NoteHeader />

				<IonContent
					forceOverscroll={false}
				>
					<_List>
						<ListTitle
							placeholder="Title"
							value={list.title}
							onChange={e => dispatch({ type: ActionType.updateTitle, payload: e.target.value })}
						/>
						<S.List>
							{itemsToDisplay.map(item => (
								<_ListItem key={item.id}>
									<IonIcon name="square-outline" mode="md" />
									<S.ListItemContent>{item.content}</S.ListItemContent>
								</_ListItem>
							))}
						</S.List>
						{/*<NoteContent
							// ref={contentRef}
							placeholder="Take a list..."
							// value={list.content}
							// onChange={e => dispatch({ type: ActionType.updateContent, payload: e.target.value })}
						/>*/}
					</_List>
				</IonContent>
			</>
		);
	}

	if (!listFromState) {
		history.replace('/home');
		return null;
	}

	const { done, todo } = list.items.reduce<Record<string, ListItem[]>>((split, item) => {
		if (item.isDone) {
			return {
				...split,
				todo: split.todo,
				done: [...split.done, item!],
			}
		}

		return {
			todo: [...split.todo, item!],
			done: split.done,
		}
	}, { done: [], todo: [] });

	return (
		<>
			<NoteHeader />

			<IonContent
				forceOverscroll={false}
			>
				<_List>
					<ListTitle
						placeholder="Title"
						value={list.title}
						onChange={e => dispatch({ type: ActionType.updateTitle, payload: e.target.value })}
					/>
					<S.List>
						{todo.map(item => (
							<ListItemComponent
								key={item.id}
								item={item}
								onChange={value => {
									const nextItem: ListItem = {
										...item,
										content: value,
									};

									dispatch({ type: ActionType.updateItem, payload: nextItem });
								}}
							/>
						))}

						<_AddListItem>
							<IonIcon name="add" mode="md" />
							<S.ListItemContent>List item</S.ListItemContent>
						</_AddListItem>
					</S.List>
				</_List>
			</IonContent>
		</>
	);
};

export default NotePage;
