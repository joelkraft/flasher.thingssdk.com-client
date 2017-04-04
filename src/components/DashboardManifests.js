// Libs
import React from 'react';
// import axios from 'axios';

// Components
import ManifestsSidebar from './sidebar/ManifestsSidebar';
import ManifestsMain from './ManifestsMain';
import './DashboardManifests.css';

// function retrieveManifest(event) {
//     axios.get(event.target.parentNode.getAttribute('data-url').replace('3000', '3001'))
//         .then(manifest => {
//             console.log(manifest.data);
//         });
// }

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