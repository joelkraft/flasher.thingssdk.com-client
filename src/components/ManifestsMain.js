import React from "react";
import VisibleManifests from "./VisibleManifests";

export default () => {
    return (
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 className="page-header">Manifests</h1>
            <VisibleManifests />
        </div>
    );
};
