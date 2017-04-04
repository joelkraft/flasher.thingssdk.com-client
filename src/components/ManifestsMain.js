import React from 'react';
import VisibleManifests from './VisibleManifests';


export default () => {
    return (
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 className="page-header">Dashboard</h1>
            <h2 className="sub-header">Manifests</h2>
            <div className="table-responsive">
                <VisibleManifests />
            </div>
        </div>
  );
}
