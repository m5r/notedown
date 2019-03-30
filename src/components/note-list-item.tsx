import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';

import { Note, NoteType } from '../state/notes';

type Props = {
	note: Note;
}

const Title = styled.div`
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5rem;
`;

const Content = styled.p`
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.5rem;
`;

const Card = styled.div`
    min-height: 120px;
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    overflow: hidden;
    position: relative;
    border-radius: 8px;
    box-sizing: border-box;
	word-break: break-word;
`;

const List = styled.ul`
	font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.5rem;
	padding: 0;
    list-style: none;
`;

const ListItem = styled.li<{ isDone: boolean }>`
    display: flex;
	align-items: center;

	${({ isDone }) => isDone && css`
		text-decoration: line-through;
	`}
`;

const ListItemContent = styled.span`
	margin-left: 8px;
`;

const NoteListItem: FunctionComponent<Props> = ({ note }) => {
	if (note.type === NoteType.Text) {
		return (
			<Link to={`/note/${note.id}`}>
				<Card>
					<Title>
						{note.title}
					</Title>
					<Content>
						{note.content}
					</Content>
				</Card>
			</Link>
		);
	}

	if (note.type === NoteType.List) {
		return (
			<Link to={`/list/${note.id}`}>
				<Card>
					<Title>
						{note.title}
					</Title>
					<List>
						{note.items.map(item => (
							<ListItem isDone={item.isDone}>
								<IonIcon
									name={item.isDone ? 'checkbox-outline' : 'square-outline'}
									mode="md"
								/>
								<ListItemContent>{item.content}</ListItemContent>
							</ListItem>
						))}
					</List>
				</Card>
			</Link>
		);
	}

	// if the data got somehow corrupted, don't display it
	return null;
};

export default NoteListItem;
