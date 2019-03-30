import React, { FunctionComponent } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useStore, useActions } from '../state/store';

type RouteParams = {
    noteId: string;
};

const NoteHeader: FunctionComponent<RouteComponentProps<RouteParams>> = ({ history, match }) => {
    const user = useStore(state => state.user.user);
    const fetchNotes = useActions(actions => actions.notes.fetchNotes);
    const deleteNote = useActions(actions => actions.notes.deleteNote);
    
    function goBackToHome() {
        history.push('/home');

        if (user) {
            fetchNotes(user.uid);
        }
    }

    function handleDeleteButtonClick() {
        if (match.params.noteId !== 'new') {
            deleteNote(match.params.noteId);
        }

        history.push('/home');
    }
    
    return (
        <IonHeader>
            <IonToolbar class="header-toolbar">
                <IonButtons slot="start">
                    <IonButton
                        class="header-back-button"
                        onClick={goBackToHome}
                    >
                        <IonIcon icon="arrow-back" color="dark" mode="md" />
                    </IonButton>
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton onClick={handleDeleteButtonClick}>
                        <IonIcon icon="trash" color="dark" mode="md" />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
}

export default withRouter(NoteHeader);
