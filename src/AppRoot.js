import React from "react";

// Redux
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

//Router
import { BrowserRouter as Router } from "react-router-dom";

import MainReducer from "./reducers/main";
import { fetchUserInfo } from "./actions/user";
import { checkTokenInCookies } from "./actions/authenticate";

// Components
import App from "./components/App";
import Login from "./components/Login";
import CheckAuthContainer from "./components/CheckAuthContainer";

const loggerMiddleware = createLogger();

const store = createStore(
    MainReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

if (store.dispatch(checkTokenInCookies())) {
    const token = store.getState().authenticate.token
    store.dispatch(fetchUserInfo(token));
}

export default () => {
   return (<Provider store={store}>
        <Router>
            <CheckAuthContainer
                LoginPage={Login}
                Protected={App}
                location={location}
            />
        </Router>
    </Provider>)
};
