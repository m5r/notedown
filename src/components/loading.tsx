import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const _Loading = styled.div`
    height: 100%;
`;

const Loading: FunctionComponent = () => (
	<_Loading>
		Loading...
	</_Loading>
);

export default Loading;
