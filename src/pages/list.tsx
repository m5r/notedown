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
	noteId: string;
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
	padding: 8px 0;
`;

const _AddListItem = styled(_ListItem)`
	color: #80868b;
`;

const PaddedList = styled(S.List)`
	padding: 0 16px 16px;
`;

const NotePage: FunctionComponent<RouteComponentProps<RouteParams>> = ({ history, match }) => {
	useAuthentication();

	function onBackButtonPressed() {
		history.push('/home');
	}

	useBackButton(onBackButtonPressed);

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
				return updatedNote;
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

	const { noteId } = match.params;
	const id = noteId === 'new' ?
		uuidv4() :
		noteId;
	const lists = useStore(state => state.notes.items);
	const user = useStore(state => state.user.user);

	// peut servir quand le user ouvre l'app directement à cette page
	const isFetching = useStore(state => state.notes.isFetching);

	const listFromState = lists.find(n => n.id === noteId) as List;
	const initialState: List = noteId === 'new' ?
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
		if (noteId === 'new' && user) {
			dispatch({ type: ActionType.updateUserId, payload: user.uid });
		}
	}, [user]);

	useEffect(() => {
		if (noteId !== 'new' && Boolean(listFromState)) {
			dispatch({ type: ActionType.overrideNote, payload: listFromState });
		}
	}, [listFromState]);

	useEffect(() => {
		if (noteId === 'new') {
			const newItem: ListItem = {
				id: uuidv4(),
				isDone: false,
				content: '',
			};

			dispatch({ type: ActionType.addItem, payload: newItem });
		}
	}, []);

	if (!user || isFetching || !list) {
		return (
			<Loading />
		);
	}

	if (noteId !== 'new' && !listFromState) {
		history.replace('/home');
		return null;
	}

	const { done, todo } = list.items.reduce<Record<string, ListItem[]>>((split, item) => {
		if (item.isDone) {
			return {
				...split,
				todo: split.todo,
				done: [...split.done, item!],
			};
		}

		return {
			todo: [...split.todo, item!],
			done: split.done,
		};
	}, { done: [], todo: [] });

	function onContentChange(value: string, item: ListItem) {
		const nextItem: ListItem = {
			...item,
			content: value,
		};

		dispatch({ type: ActionType.updateItem, payload: nextItem });
	}

	function onCheckboxClick(item: ListItem) {
		const nextItem: ListItem = {
			...item,
			isDone: !item.isDone,
		};

		dispatch({ type: ActionType.updateItem, payload: nextItem });
	}

	function onAddListItem() {
		const newItem: ListItem = {
			id: uuidv4(),
			isDone: false,
			content: '',
		};

		dispatch({ type: ActionType.addItem, payload: newItem });
	}

	return (
		<>
			<NoteHeader note={list} />

			<IonContent
				forceOverscroll={false}
			>
				<_List>
					<ListTitle
						placeholder="Title"
						value={list.title}
						onChange={e => dispatch({ type: ActionType.updateTitle, payload: e.target.value })}
					/>
					<PaddedList>
						{todo.map(item => (
							<ListItemComponent
								key={item.id}
								item={item}
								onCheckboxClick={() => onCheckboxClick(item)}
								onContentChange={(value) => onContentChange(value, item)}
								isLatestItem={item.content === '' && todo[todo.length - 1].id === item.id}
							/>
						))}

						<_AddListItem onClick={onAddListItem}>
							<IonIcon name="add" mode="md" />
							<S.ListItemContent>List item</S.ListItemContent>
						</_AddListItem>

						{done.map((item, index) => (
							<ListItemComponent
								key={item.id}
								isFirst={index === 0}
								item={item}
								onCheckboxClick={() => onCheckboxClick(item)}
								onContentChange={(value) => onContentChange(value, item)}
							/>
						))}
					</PaddedList>
				</_List>
			</IonContent>
		</>
	);
};

export default NotePage;
