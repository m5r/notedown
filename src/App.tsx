import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IonApp, IonSplitPane, IonPage } from '@ionic/react';
import { StoreProvider } from 'easy-peasy';

import Landing from './pages/landing';
import Login from './pages/login';
import Signup from './pages/signup';

import store from './state/store';
import FirebaseContext from './firebase/context';

import Firebase from './firebase';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

const App: FunctionComponent = () => (
	<StoreProvider store={store}>
		<FirebaseContext.Provider value={new Firebase()}>
			<Router>
				<main id="app">
					<IonApp>
						<IonSplitPane contentId="main">
							<IonPage id="main">
								<Switch>
									<Route path="/login" component={Login} />
									<Route path="/signup" component={Signup} />
									<Route path="/" component={Landing} />
								</Switch>
							</IonPage>
						</IonSplitPane>
					</IonApp>
				</main>
			</Router>
		</FirebaseContext.Provider>
	</StoreProvider>
);

export default App;
