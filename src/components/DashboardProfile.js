import React from "react";
import "./DashboardProfile.css";

const DashboardProfile = ({ match }) => {
    console.log("fired", match);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-3 col-md-2 sidebar">
                    <h1>Profile :)</h1>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;
