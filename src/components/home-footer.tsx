import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';

const _HomeFooter = styled.footer`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 0 0 50px;
    box-shadow:
        0 4px 5px 0 rgba(0,0,0,0.14),
        0 1px 10px 0 rgba(0,0,0,0.12),
        0 2px 4px -1px rgba(0,0,0,0.2);
    z-index: 1;
    align-items: center;
`;

const Label = styled.div`
    letter-spacing: .00625em;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5rem;
    color: #50565b;
    padding-left: 16px;
`;

const ButtonsContainer = styled.div`
	padding-right: 16px;
    
    & ion-icon {
    	font-size: 24px;
    	color: #80868b;
    }
`;

const HomeFooter: FunctionComponent = () => (
	<_HomeFooter>
		<Link to="/note/new">
			<Label>
				Take a note...
			</Label>
		</Link>
		<ButtonsContainer>
			<Link to="/list/new">
				<IonIcon name="checkbox-outline" mode="ios" />
			</Link>
		</ButtonsContainer>
	</_HomeFooter>
);

export default HomeFooter;
