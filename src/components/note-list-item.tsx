import React, { FunctionComponent } from 'react';

import { Note, NoteType } from '../state/notes';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
					<Content>
						{note.items.map(item => (
							<div style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}>{item.content}</div>
						))}
					</Content>
				</Card>
			</Link>
		);
	}

	// if the data got somehow corrupted, don't display it
	return null;
};

export default NoteListItem;
