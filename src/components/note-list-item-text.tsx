import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import S from './common';

import { Text } from '../state/notes';
import { vibrationFeedback } from '../utils';

type Props = {
	note: Text;
}

const Content = styled.p`
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.5rem;
`;

const NoteListItemText: FunctionComponent<Props> = ({ note }) => (
	<Link to={`/note/${note.id}`} onClick={() => vibrationFeedback()}>
		<S.ListItemCard>
			<S.ListItemTitle>
				{note.title}
			</S.ListItemTitle>
			<Content>
				{note.content}
			</Content>
		</S.ListItemCard>
	</Link>
);

export default NoteListItemText;
