import React, { FunctionComponent } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useStore, useActions } from '../state/store';

const NoteHeader: FunctionComponent<RouteComponentProps> = ({ history }) => {
    const user = useStore(state => state.user.user);
    const fetchNotes = useActions(actions => actions.notes.fetchNotes);
    
    function handleBackButtonClick() {
        history.push('/home');

        if (user) {
            fetchNotes(user.uid);
        }
    }
    
    return (
        <IonHeader>
            <IonToolbar class="header-toolbar">
                <IonButtons slot="start">
                    <IonButton
                        class="header-back-button"
                        onClick={handleBackButtonClick}
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
}

export default withRouter(NoteHeader);
