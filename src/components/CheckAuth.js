import React from "react";

//Router
import { Route, Switch, Redirect } from "react-router-dom";

export default (LoginPage, Protected) => {
    return ({ location, authenticated }) => {
        const path = location.pathname;
        if (authenticated) {
            if (path === "/login") {
                return <Redirect to="/" />;
            }
            return <Route path={path} component={Protected} />;
        }
        return (
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Redirect to="login" />
            </Switch>
        );
    };
};
