import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { IonIcon } from '@ionic/react';

import S from './common';

import { ListItem } from '../state/notes';

type Props = {
	item: ListItem;
	onChange: (nextValue: string) => void;
};

const _ListItem = styled.li<{ rows: number }>`
    display: flex;
	align-items: center;
	
	${({ rows }) => css`
		height: calc(31px + (${rows} * 22px));
	`}
`;

const ListItemContent = styled.textarea<{ height: number }>`
	border: none;
	outline: none;
	width: 100%;
	
	${({ height }) => css`
		height: ${height}px;
	`}
`;

const ListItemComponent: FunctionComponent<Props> = ({ item, onChange }) => {
	const contentRef = useRef<HTMLTextAreaElement>(null);
	const [rows, setRows] = useState(0);

	useEffect(() => {
		function updateRows() {
			const rows = (contentRef.current ? Math.ceil((contentRef.current.scrollHeight - 9) / 22) : 1) - 1;
			setRows(rows);
		}

		if (contentRef.current) {
			const rows = Math.ceil((contentRef.current.scrollHeight - 9) / 22) - 1;
			setRows(rows);

			contentRef.current.addEventListener('input', updateRows, false);
		}

		return () => {
			if (contentRef.current) {
				contentRef.current.removeEventListener('input', updateRows, false);
			}
		};
	}, []);

	return (
		<_ListItem rows={rows}>
			<IonIcon name={item.isDone ? 'checkbox-outline' : 'square-outline'} mode="md" />
			<S.ListItemContent>
				<ListItemContent
					ref={contentRef}
					height={26 + (rows * 22)}
					onChange={e => onChange(e.target.value)}
					value={item.content}
				/>
			</S.ListItemContent>
		</_ListItem>
	);
};

export default ListItemComponent;
