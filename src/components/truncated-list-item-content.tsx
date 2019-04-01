import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import S from './common';

const _TruncatedListItemContent = styled(S.ListItemContent)<{ height: number }>`
	display: -webkit-box;
	-webkit-line-clamp: 3;
	overflow: hidden;
	text-overflow: ellipsis;
	
	${({ height }) => height !== -1 && css`
		-webkit-box-orient: ${height > 44 ? 'vertical' : 'horizontal'}
	`}
`;

const TruncatedListItemContent: FunctionComponent = ({ children }) => {
	const itemRef = useRef<HTMLSpanElement>(null);
	const [scrollHeight, setScrollHeight] = useState(-1);

	useEffect(() => {
		if (itemRef.current) {
			setScrollHeight(itemRef.current.scrollHeight);
		}
	}, []);

	return (
		<_TruncatedListItemContent
			ref={itemRef}
			height={scrollHeight}
		>
			{children}
		</_TruncatedListItemContent>
	)
};

export default TruncatedListItemContent;
