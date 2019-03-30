import React, { FunctionComponent } from 'react';

import { Note } from '../state/notes';
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
};

export default NoteListItem;
