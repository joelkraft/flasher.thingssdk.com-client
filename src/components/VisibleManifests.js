// Libs
import React from 'react';
import { connect } from 'react-redux';

function getVisibleManifests( manifests, filter ) {
    switch ( filter ) {
        case 'ALL':
            return manifests;
        case 'MY':
            return manifests.filter(man => man.version === '1v85');
        default:
            return manifests;
    }
}

const mapStateToManifestListProps = (
    state
) => ({
    manifests: getVisibleManifests(
        state.manifests,
        state.manifestFilter
    )
});

const ManifestList = ({ 
    manifests,
    onManifestClick
}) => (
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Version</th>
                <th>Board</th>
                <th>Revision</th>
            </tr>
        </thead>
        <tbody>
            {manifests.map((man) => {
                const { manifest, name, version, board, revision } = man;
                return (
                    <tr 
                      key={manifest}
                      data-url={manifest}
                    >
                        <td>{name}</td>
                        <td>{version}</td>
                        <td>{board}</td>
                        <td>{revision}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
);


export default connect(mapStateToManifestListProps)(ManifestList);