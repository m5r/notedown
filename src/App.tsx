import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonSplitPane, IonPage } from '@ionic/react';
import { StoreProvider } from 'easy-peasy';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

import Landing from './pages/landing';
import Login from './pages/login';
import Signup from './pages/signup';
import Logout from './pages/logout';
import Home from './pages/home';
import NotePage from './pages/note';
import ListPage from './pages/list';

import store from './state/store';
import FirebaseServiceContext from './firebase/context';

import firebaseService from './firebase';

const App: FunctionComponent = () => (
	<StoreProvider store={store}>
		<FirebaseServiceContext.Provider value={firebaseService}>
			<Router>
				<main id="app">
					<IonApp>
						<IonSplitPane contentId="main">
							<IonPage id="main">
								<Switch>
									<Route path="/" component={Landing} exact />
									<Route path="/login" component={Login} exact />
									<Route path="/signup" component={Signup} exact />
									<Route path="/logout" component={Logout} exact />
									<Route path="/home" component={Home} exact />
									<Route path="/note/:noteId" component={NotePage} exact />
									<Route path="/list/:noteId" component={ListPage} exact />
									<Route path="*" render={() => <Redirect to="/" />} />
								</Switch>
							</IonPage>
						</IonSplitPane>
					</IonApp>
				</main>
			</Router>
		</FirebaseServiceContext.Provider>
	</StoreProvider>
);

export default App;
