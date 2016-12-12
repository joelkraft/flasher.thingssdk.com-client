// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// Components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Dashboard} />
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup} />
  </Router>
), document.getElementById('root'));
