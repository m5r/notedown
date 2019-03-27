import React, { FunctionComponent, useContext, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import {
	IonBackButton,
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonTitle,
	IonToolbar,
} from '@ionic/react';

import StartingPageContainer from '../components/starting-page-container';
import StartingPageContent from '../components/starting-page-content';

import FirebaseServiceContext from '../firebase/context';
import { useActions } from '../state/store';
import { useAuthentication } from '../firebase/hooks';

const Signup: FunctionComponent<RouteComponentProps> = ({ history }) => {
	useAuthentication();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const firebase = useContext(FirebaseServiceContext);
	const setUser = useActions(actions => actions.user.setUser);

	async function submitSignupForm() {
		try {
			const userCredential = await firebase.createUser(email, password);
			setUser(userCredential.user);
			history.replace('/home')
		} catch (e) {
			alert(e.message);
		}
	}

	return (
		<>
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
					<IonTitle>Signup</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent
				forceOverscroll={false}
			>
				<StartingPageContainer>
					<StartingPageContent>
						<form onSubmit={e => e.preventDefault()} noValidate>
							<IonList no-lines>
								<IonItem>
									<IonLabel position="floating" color="dark">Email</IonLabel>
									<IonInput
										onIonChange={e => setEmail(e.detail.value!)}
										name="email"
										type="text"
										autocapitalize="off"
										value={email}
										required
									/>
								</IonItem>
								<IonItem>
									<IonLabel position="floating" color="dark">Password</IonLabel>
									<IonInput
										onIonChange={e => setPassword(e.detail.value!)}
										name="password"
										type="password"
										value={password}
										required
									/>
								</IonItem>
							</IonList>
						</form>
					</StartingPageContent>

					<StartingPageContent>
						<IonButton onClick={submitSignupForm} color="dark" expand="block" fill="clear" type="submit">
							Sign up
						</IonButton>
					</StartingPageContent>
				</StartingPageContainer>
			</IonContent>
		</>
	);
};

export default withRouter(Signup);
