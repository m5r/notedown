import React, { FunctionComponent, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { IonButton, IonContent, IonText } from '@ionic/react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import StartingPageContainer from '../components/starting-page-container';
import StartingPageContent from '../components/starting-page-content';
import FirebaseContext from '../firebase/context';
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
	const firebase = useContext(FirebaseContext);
	const setUser = useActions(actions => actions.user.setUser);

	useEffect(() => {
		const unsubscribe = firebase.auth.onAuthStateChanged(((user) => {
			if (user) {
				setUser(user);
				history.replace('/home');
			}
		}));

		return unsubscribe;
	}, []);

	return (
		<IonContent
			forceOverscroll={false}
		>
			<StartingPageContainer>
				<StartingPageContent>
					<IonText color="dark">
						<Title>Notedown</Title>
						<p>Remember everything that matters.</p>
					</IonText>
				</StartingPageContent>

				<StartingPageContent>
					<p>Get started</p>
					<ButtonsContainer>
						<IonButton class="landing-button" color="light">
							<LogoButton src="/img/facebook.svg" />
						</IonButton>
						<IonButton class="landing-button" color="light">
							<LogoButton src="/img/google.svg" />
						</IonButton>
					</ButtonsContainer>
				</StartingPageContent>

				<StartingPageContent>
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
				</StartingPageContent>
			</StartingPageContainer>
		</IonContent>
	);
}

export default withRouter(Landing);
