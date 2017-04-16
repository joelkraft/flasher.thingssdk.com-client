import React from "react";
import "./DashboardProfile.css";

const DashboardProfile = ({match}) => {
    console.log('fired', match)
    return (
        <div className="container-fluid">
            <div className="row">
                <h1>Profile :)</h1>
            </div>
        </div>
    )
}

export default DashboardProfile;