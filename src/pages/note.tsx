import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/react';

import Loading from '../components/loading';

import { useStore } from '../state/store';
import { useAuthentication } from '../firebase/hooks';

type RouteParams = {
    noteId: string;
};

const Note: FunctionComponent<RouteComponentProps<RouteParams>> = ({ history, match }) => {
    useAuthentication();

    const { noteId } = match.params;
    const user = useStore(state => state.user.user);
    const isFetching = useStore(state => state.notes.isFetching);
    const notes = useStore(state => state.notes.items);
    const isLoading = !user || isFetching;

    const note = notes.find(item => item.id === noteId);

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton
                            goBack={() => history.push('/home')}
                            defaultHref='/home'
                            onClick={() => history.push('/home')}
                            color='dark'
                        />
                    </IonButtons>
                    <IonTitle>
                        Notedown
					</IonTitle>
                </IonToolbar>
            </IonHeader>

            <div>
                {
                    isLoading ? (
                        <Loading />
                    ) : (
                            <>
                                <h5>Edit a note here</h5>
                                <textarea defaultValue="truc" />
                            </>
                        )
                }
            </div>
        </>
    );
}

export default Note;
