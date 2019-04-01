import React, { FunctionComponent, useContext, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
	IonButton,
	IonContent,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
} from '@ionic/react';

import S from '../components/common';
import AppUnauthentifiedHeader from '../components/app-unauthentified-header';

import FirebaseServiceContext from '../firebase/context';
import { useActions } from '../state/store';
import { useAuthentication } from '../firebase/hooks';
import { useBackButton } from '../utils';

const Signup: FunctionComponent<RouteComponentProps> = ({ history }) => {
	useAuthentication();

	function onBackButtonPressed() {
		history.push('/');
	}

	useBackButton(onBackButtonPressed);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const firebase = useContext(FirebaseServiceContext);
	const setUser = useActions(actions => actions.user.setUser);

	async function submitSignupForm() {
		try {
			setIsLoading(true);
			const userCredential = await firebase.createUser(email, password);
			setIsLoading(false);
			setUser(userCredential.user);
			history.replace('/home');
		} catch (e) {
			setIsLoading(false);
			alert(e.message);
		}
	}

	return (
		<>
			<AppUnauthentifiedHeader pageTitle="Signup" />
			<IonContent
				forceOverscroll={false}
			>
				<S.StartingPageContainer>
					<S.StartingPageContent>
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
					</S.StartingPageContent>

					<S.StartingPageContent>
						<IonButton
							onClick={submitSignupForm}
							color="dark"
							expand="block"
							fill="clear"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? 'Signing up...' : 'Sign up'}
						</IonButton>
					</S.StartingPageContent>
				</S.StartingPageContainer>
			</IonContent>
		</>
	);
};

export default withRouter(Signup);
