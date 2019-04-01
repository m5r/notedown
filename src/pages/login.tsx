import React, { FunctionComponent, useContext, useState } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
	IonButton,
	IonContent,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
} from '@ionic/react';

import AppUnauthentifiedHeader from '../components/app-unauthentified-header';

import FirebaseServiceContext from '../firebase/context';
import { useActions } from '../state/store';
import { useAuthentication } from '../firebase/hooks';
import { useBackButton } from '../utils';

const LoginContainer = styled.div`
  background-image: url('/img/landing-background.jpg');
  background-size: cover;
  background-position: -100px 0;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: end;
`;

const LoginContent = styled.div`
  text-align: center;
  width: 100%;
  
  &:last-child {
    align-self: center;
  }
`;

const Login: FunctionComponent<RouteComponentProps> = ({ history }) => {
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

	async function submitLoginForm() {
		try {
			setIsLoading(true);
			const userCredential = await firebase.logIn(email, password);
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
			<AppUnauthentifiedHeader pageTitle="Login" />

			<IonContent
				forceOverscroll={false}
			>
				<LoginContainer>
					<LoginContent>
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
					</LoginContent>

					<LoginContent>
						<IonButton
							onClick={submitLoginForm}
							color="dark"
							expand="block"
							fill="clear"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? 'Logging in...' : 'Log in'}
						</IonButton>
					</LoginContent>
				</LoginContainer>
			</IonContent>
		</>
	);
};

export default withRouter(Login);
