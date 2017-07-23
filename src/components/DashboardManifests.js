// Libs
import React from 'react';

// Components
import ManifestsSidebar from './sidebar/ManifestsSidebar';
import ManifestsMain from './ManifestsMain';
import './DashboardManifests.css';

const DashboardBody = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <ManifestsSidebar />
                <ManifestsMain />
            </div>
        </div>
    );
}

export default DashboardBody;