// Libs
import React, { Component } from "react";
import { connect } from "react-redux";
import ManifestEdit from "./ManifestEdit";

function getVisibleManifests(manifests, filter) {
    switch (filter) {
        case "ALL":
            return manifests;
        case "MY":
            return manifests.filter(man => man.isAuthor);
        default:
            return manifests;
    }
}

function renderLabel(cond, yes, no) {
    return cond
        ? yes
              ? <span className={`label label-${yes.type}`}>{yes.name}</span>
              : ""
        : no ? <span className={`label label-${no.type}`}>{no.name}</span> : "";
}
const mapStateToManifestListProps = (state, ownProps) => ({
    manifests: getVisibleManifests(state.manifests.items, state.manifestFilter),
    open: ownProps.open
});

class ManifestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            currentManifest: {}
        };
    }
    open(manifest) {
        this.setState({ showModal: true, currentManifest: manifest });
    }
    close() {
        this.setState({ showModal: false });
    }
    handleChange(delta) {
        this.setState({
            ...this.state,
            currentManifest: {
                ...this.state.currentManifest,
                [delta.key]: delta.value
            }
        });
        console.log(this.state);
    }
    render() {
        return (
            <div>
                <ManifestEdit
                    close={this.close.bind(this)}
                    showModal={this.state.showModal}
                    handleChange={this.handleChange.bind(this)}
                    manifestDetails={this.state.currentManifest}
                />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Version</th>
                            <th>Board</th>
                            <th>Revision</th>
                            <th>Published</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.manifests.map(man => {
                            const {
                                manifest,
                                name,
                                version,
                                board,
                                revision,
                                isAuthor,
                                published
                            } = man;
                            return (
                                <tr
                                    key={manifest}
                                    data-url={manifest}
                                    onClick={this.open.bind(this, man)}
                                >
                                    <td>{name}</td>
                                    <td>{version}</td>
                                    <td>{board}</td>
                                    <td>{revision}</td>
                                    <td>
                                        {renderLabel(
                                            published,
                                            {
                                                type: "success",
                                                name: "published"
                                            },
                                            {
                                                type: "danger",
                                                name: "unpublished"
                                            }
                                        )}
                                    </td>
                                    <td>
                                        {renderLabel(isAuthor, {
                                            type: "info",
                                            name: "author"
                                        })}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(mapStateToManifestListProps)(ManifestList);
