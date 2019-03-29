import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/react';

type OwnProps = {
    pageTitle: string;
};

type Props = OwnProps & RouteComponentProps;

const AppUnauthentifiedHeader: FunctionComponent<Props> = ({ history, pageTitle }) => (
    <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton
                    goBack={() => history.push('/')}
                    defaultHref='/'
                    onClick={() => history.push('/')}
                    color='dark'
                />
            </IonButtons>
            <IonTitle>{pageTitle}</IonTitle>
        </IonToolbar>
    </IonHeader>
);

export default withRouter(AppUnauthentifiedHeader);
