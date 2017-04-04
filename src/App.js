import React from 'react';
import { createStore } from 'redux';
import AppReducer from './reducers/app';

// Components
import AppContainer from './components/AppContainer';

const store = createStore(
    AppReducer
);

export default () => (
    <AppContainer store={store} />
);

