import React, { FunctionComponent, useContext, useState } from 'react';
import styled from 'styled-components';
import { IonButton, IonContent, IonText } from '@ionic/react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import S from '../components/common';

import { useAuthentication } from '../firebase/hooks';
import FirebaseServiceContext from '../firebase/context';
import { useActions } from '../state/store';

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 120px 120px;
  grid-template-rows: 1fr;
  width: 100%;
  justify-content: center;
`;

const LogoButton = styled.img`
  height: 80%;
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Landing: FunctionComponent<RouteComponentProps> = ({ history }) => {
	useAuthentication();

	const [isLoading, setIsLoading] = useState(false);
	const setUser = useActions(actions => actions.user.setUser);
	const firebase = useContext(FirebaseServiceContext);

	async function handleGoogleLoginButton() {
		try {
			setIsLoading(true);

			const userCredential = await firebase.logInWithGoogle();

			setIsLoading(false);
			setUser(userCredential.user);

			history.replace('/home');
		} catch (e) {
			setIsLoading(false);

			alert(e.message);
		}
	}

	return (
		<IonContent
			forceOverscroll={false}
		>
			<S.StartingPageContainer>
				<S.StartingPageContent>
					<IonText color="dark">
						<Title>Notedown</Title>
						<p>Remember everything that matters.</p>
					</IonText>
				</S.StartingPageContent>

				<S.StartingPageContent>
					<p>Get started</p>
					<ButtonsContainer>
						<IonButton
							onClick={() => alert('not available yet duh')}
							disabled={isLoading}
							class="landing-button"
							color="light"
						>
							<LogoButton src="/img/facebook.svg" />
						</IonButton>
						<IonButton
							onClick={handleGoogleLoginButton}
							disabled={isLoading}
							class="landing-button"
							color="light"
						>
							<LogoButton src="/img/google.svg" />
						</IonButton>
					</ButtonsContainer>
				</S.StartingPageContent>

				<S.StartingPageContent>
					<ButtonsContainer>
						<Link to='/login'>
							<IonButton color="dark" expand="block" fill="clear">
								Log in
							</IonButton>
						</Link>
						<Link to='/signup'>
							<IonButton color="dark" expand="block" fill="clear">
								Sign up
							</IonButton>
						</Link>
					</ButtonsContainer>
				</S.StartingPageContent>
			</S.StartingPageContainer>
		</IonContent>
	);
};

export default withRouter(Landing);
