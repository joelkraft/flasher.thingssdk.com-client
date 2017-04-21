// Libs
import React from 'react';
import { connect } from 'react-redux';

function getVisibleManifests( manifests, filter ) {
    switch ( filter ) {
        case 'ALL':
            return manifests;
        case 'MY':
            return manifests.filter(man => man.isAuthor);
        default:
            return manifests;
    }
}

function renderLabel(cond, yes, no) {
    return cond
        ? yes ? <span className={`label label-${yes.type}`}>{yes.name}</span> : ''
        : no ? <span className={`label label-${no.type}`}>{no.name}</span> : ''
}
const mapStateToManifestListProps = (
    state
) => ({
    manifests: getVisibleManifests(
        state.manifests.items,
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
                <th>Published</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {manifests.map((man) => {
                const { manifest, name, version, board, revision, isAuthor, published } = man;
                return (
                    <tr 
                      key={manifest}
                      data-url={manifest}
                    >
                        <td>{name}</td>
                        <td>{version}</td>
                        <td>{board}</td>
                        <td>{revision}</td>
                        <td>{renderLabel(published, {type: 'success', name:'published'}, {type:'danger', name: 'unpublished'})}</td>
                        <td>{renderLabel(isAuthor, {type:'info', name:'author'})}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
);


export default connect(mapStateToManifestListProps)(ManifestList);