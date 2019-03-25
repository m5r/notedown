import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IonApp, IonSplitPane, IonPage } from '@ionic/react';
import { StoreProvider } from 'easy-peasy';

import LandingPage from './pages/landing-page';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

import store from './state/store';

const App: FunctionComponent = () => (
    <StoreProvider store={store}>
      <Router>
        <div id="app">
          <IonApp>
            <IonSplitPane contentId="main">
              <IonPage id="main">
                <Switch>
                  <Route path="/" component={LandingPage} />
                </Switch>
              </IonPage>
            </IonSplitPane>
          </IonApp>
        </div>
      </Router>
    </StoreProvider>
);

export default App;
