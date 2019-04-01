import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const _NotesList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 6px));
    grid-column-gap: 8px;
    padding: 16px 16px 32px;
    overflow-y: auto;
    flex: 1;
    padding-bottom: 30px;
`;

const Column = styled.section`
	display: grid;
	grid-template-rows: max-content;
    grid-row-gap: 8px;
    align-content: flex-start;
`;

function getHeight(): string {
	return `${Math.floor(Math.random() * 195) + 110}px`;
}

const LoadingList: FunctionComponent = () => (
	<_NotesList>
		<Column>
			<Skeleton height={getHeight()}/>
			<Skeleton height={getHeight()}/>
			<Skeleton height={getHeight()}/>
			<Skeleton height={getHeight()}/>
		</Column>
		<Column>
			<Skeleton height={getHeight()}/>
			<Skeleton height={getHeight()}/>
			<Skeleton height={getHeight()}/>
			<Skeleton height={getHeight()}/>
		</Column>
	</_NotesList>
);

export default LoadingList;
