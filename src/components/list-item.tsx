import React, { FunctionComponent, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IonIcon } from '@ionic/react';
import autosize  from 'autosize';

import S from './common';

import { ListItem } from '../state/notes';

type Props = {
	item: ListItem;
	onChange: (nextValue: string) => void;
};

const _ListItem = styled.li`
    display: flex;
	align-items: center;
`;

const ListItemContent = styled.textarea`
	border: none;
	outline: none;
	width: 100%;
`;

const ListItemComponent: FunctionComponent<Props> = ({ item, onChange }) => {
	const contentRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			autosize(contentRef.current);
		}
	}, []);

	return (
		<_ListItem>
			<IonIcon name={item.isDone ? 'checkbox-outline' : 'square-outline'} mode="md" />
			<S.ListItemContent>
				<ListItemContent
					ref={contentRef}
					onChange={e => onChange(e.target.value)}
					value={item.content}
				/>
			</S.ListItemContent>
		</_ListItem>
	);
};

export default ListItemComponent;
