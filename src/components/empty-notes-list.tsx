import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const _Empty = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	place-items: center;
    place-content: center;
    flex-direction: column;
`;

const Message = styled.strong`
	padding: 8px 0 4px;
	text-align: center;
	color: #50565b;
`;

const SubMessage = styled.span`
	padding: 0 16px;
	text-align: center;
	color: #70767b;
`;

const EmptyNotesList: FunctionComponent = () => (
	<_Empty>
		<img src="/img/empty.png" />
		<Message>Create your first note</Message>
		<SubMessage>Tap "Take a note..." to create a note or the checkbox to create a list.</SubMessage>
	</_Empty>
);

export default EmptyNotesList;
