import React, { FunctionComponent, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { IonIcon } from '@ionic/react';
import AutosizeTextarea from 'react-autosize-textarea';

import S from './common';

import { ListItem } from '../state/notes';

type Props = {
	item: ListItem;
	isFirst?: boolean;
	isLatestItem?: boolean;
	onCheckboxClick: () => void;
	onContentChange: (nextValue: string) => void;
};

const _ListItem = styled.li<{ isDone: boolean, isFirst?: boolean }>`
    display: flex;
	align-items: center;
	padding: 8px 0;
	
	${({ isDone }) => isDone && css`
		text-decoration: line-through;
		color: rgba(0,0,0,.54);
	`}
	
	${({ isDone, isFirst }) => isFirst && isDone && css`
		border-top: 1px solid #80868b;
		padding-top: 16px;
		margin-top: 16px;
	`};
`;

const ListItemContent = styled(AutosizeTextarea)`
	border: none;
	outline: none;
	width: 100%;
`;

const ListItemComponent: FunctionComponent<Props> = ({ item, isFirst, isLatestItem, onCheckboxClick, onContentChange }) => {
	const itemRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (isLatestItem && itemRef.current) {
			itemRef.current.focus();
		}
	}, [itemRef, item]);

	return (
		<_ListItem isFirst={isFirst} isDone={item.isDone}>
			<IonIcon
				onClick={onCheckboxClick}
				name={item.isDone ? 'checkbox-outline' : 'square-outline'}
				mode="md"
			/>
			<S.ListItemContent>
				<ListItemContent
					ref={itemRef}
					onChange={e => onContentChange(e.currentTarget.value)}
					value={item.content}
				/>
			</S.ListItemContent>
		</_ListItem>
	);
};

export default ListItemComponent;
