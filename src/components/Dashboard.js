import React from "react";
import NavContainer from "./NavContainer";
import { Route } from "react-router-dom";

import DashboardManifests from "./DashboardManifests";
import DashboardProfile from "./DashboardProfile";

const Dashboard = ({ match }) => {
    return (
        <div className="row">
            <NavContainer />
            <Route exact path="/" component={DashboardManifests} />
            <Route path="/profile" component={DashboardProfile} />
        </div>
    );
};

export default Dashboard;
