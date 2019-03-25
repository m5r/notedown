import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { IonButton, IonContent, IonText } from '@ionic/react';

const LandingContainer = styled.div`
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

const LandingContent = styled.div`
  text-align: center;
  width: 100%;
  
  &:last-child {
    align-self: center;
  }
`;

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

const LandingPage: FunctionComponent = () => (
	<IonContent
		forceOverscroll={false}
	>
		<LandingContainer>
			<LandingContent>
				<IonText color="dark">
					<Title>Notedown</Title>
					<p>Remember everything that matters.</p>
				</IonText>
			</LandingContent>

			<LandingContent>
				<p>Get started</p>
				<ButtonsContainer>
					<IonButton class="landing-button" color="light">
						<LogoButton src="/img/facebook.svg" />
					</IonButton>
					<IonButton class="landing-button" color="light">
						<LogoButton src="/img/google.svg" />
					</IonButton>
				</ButtonsContainer>
			</LandingContent>

			<LandingContent>
				<ButtonsContainer>
					<IonButton color="dark" expand="block" fill="clear">
						Log in
					</IonButton>
					<IonButton color="dark" expand="block" fill="clear">
						Sign up
					</IonButton>
				</ButtonsContainer>
			</LandingContent>
		</LandingContainer>
	</IonContent>
);

export default LandingPage;
