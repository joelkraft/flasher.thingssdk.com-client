import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';

// Components
import Dashboard from './Dashboard';
import DashboardManifests from './DashboardManifests';
import DashboardProfile from './DashboardProfile';
import Login from './Login';
import Signup from './Signup';

import '../App.css';

const AppContainer = ({ store }) => (
    <Provider store={ store }>
        <Router history={browserHistory}>
            <Route path="/">
                <IndexRedirect to="/dashboard" />
                <Route component={Dashboard}>
                    <Route path="dashboard" component={DashboardManifests}/>
                    <Route path="profile" component={DashboardProfile} />
                </Route>
                <Route path="login" component={Login} />
                <Route path="signup" component={Signup} />
            </Route>
        </Router>
    </Provider>
);

export default AppContainer;