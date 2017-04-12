import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import MainReducer from './reducers/main';
import { fetchManifests } from './actions/manifests';
import { checkForToken } from './actions/authenticate';

// Components
import AppRoot from './components/AppRoot';

const loggerMiddleware = createLogger();

const store = createStore(
    MainReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

store.dispatch(checkForToken());
store.dispatch(fetchManifests());

export default () => (
    <AppRoot store={store} />
);

