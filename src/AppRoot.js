import React from "react";

// Redux
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

//Router
import { BrowserRouter as Router } from "react-router-dom";

import MainReducer from "./reducers/main";
import { fetchManifests } from "./actions/manifests";
import { checkForToken } from "./actions/authenticate";

// Components
import App from "./components/App";
import Login from "./components/Login";
import checkAuth from "./components/CheckAuth";

const CheckAuth = checkAuth(Login, App);

const loggerMiddleware = createLogger();

const store = createStore(
    MainReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

if (store.dispatch(checkForToken())) {
    store.dispatch(fetchManifests());
}

const authenticated = true;
export default () => (
    <Provider store={store}>
        <Router>
            <CheckAuth authenticated={authenticated} location={location} />
        </Router>
    </Provider>
);
