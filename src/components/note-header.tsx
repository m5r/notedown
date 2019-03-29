import React, { FunctionComponent } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';

const NoteHeader: FunctionComponent<RouteComponentProps> = ({ history }) => (
    <IonHeader>
        <IonToolbar class="header-toolbar">
            <IonButtons slot="start">
                <IonButton
                    class="header-back-button" 
                    onClick={() => history.push('/home')}
                >
                    <IonIcon icon="arrow-back" color="dark" mode="md" />
                </IonButton>
            </IonButtons>
            <IonButtons slot="end">
                <IonButton onClick={() => history.push('/home')}>
                    <IonIcon icon="trash" color="dark" mode="md" />
                </IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>
);

export default withRouter(NoteHeader);
