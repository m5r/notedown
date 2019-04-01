import React, { FunctionComponent, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { IonIcon } from '@ionic/react';
import autosize from 'autosize';

import S from './common';

import { ListItem } from '../state/notes';

type Props = {
	item: ListItem;
	isFirst?: boolean;
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

const ListItemContent = styled.textarea`
	border: none;
	outline: none;
	width: 100%;
	height: 100%;
`;

const ListItemComponent: FunctionComponent<Props> = ({ item, isFirst, onCheckboxClick, onContentChange }) => {
	const contentRef = useRef<HTMLTextAreaElement>(null);

	(window as any).autosize = autosize;
	(window as any).ddd = (window as any).ddd || [];
	(window as any).ddd.push(contentRef);

	useEffect(() => {
		if (contentRef.current) {
			autosize(contentRef.current);
		}
	}, []);

	return (
		<_ListItem isFirst={isFirst} isDone={item.isDone}>
			<IonIcon
				onClick={onCheckboxClick}
				name={item.isDone ? 'checkbox-outline' : 'square-outline'}
				mode="md"
			/>
			<S.ListItemContent>
				<ListItemContent
					ref={contentRef}
					onChange={e => onContentChange(e.target.value)}
					value={item.content}
				/>
			</S.ListItemContent>
		</_ListItem>
	);
};

export default ListItemComponent;
