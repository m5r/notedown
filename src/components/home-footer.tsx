import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { IonIcon } from '@ionic/react';

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

const HomeFooter: FunctionComponent = () => (
    <_HomeFooter>
        <Label>
            Take a note...
        </Label>
        <div>
            <IonIcon size="large" name="checkbox-outline" />
        </div>
    </_HomeFooter>
);

export default HomeFooter;
