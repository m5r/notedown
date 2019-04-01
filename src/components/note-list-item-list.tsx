import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IonIcon } from '@ionic/react';

import S from './common';
import TruncatedListItemContent from './truncated-list-item-content';

import { List } from '../state/notes';

type Props = {
	note: List;
}

const BottomCardMessage = styled.div`
	padding-top: 8px;
`;

const NoteListItemList: FunctionComponent<Props> = ({ note }) => {
	const itemsToDisplay = note.items.filter(item => !item.isDone);
	const hiddenItemsCount = note.items.length - itemsToDisplay.length;
	const bottomCardMessage = `+${hiddenItemsCount} checked item${hiddenItemsCount > 1 ? 's' : ''}`;

	return (
		<Link to={`/list/${note.id}`}>
			<S.ListItemCard>
				<S.ListItemTitle>
					{note.title}
				</S.ListItemTitle>
				<S.List>
					{itemsToDisplay.map(item => (
						<S.ListItem key={item.id}>
							<IonIcon name="square-outline" mode="md" />
							<TruncatedListItemContent>{item.content}</TruncatedListItemContent>
						</S.ListItem>
					))}
					{hiddenItemsCount > 0 && (
						<BottomCardMessage>
							{bottomCardMessage}
						</BottomCardMessage>
					)}
				</S.List>
			</S.ListItemCard>
		</Link>
	);
};

export default NoteListItemList;
