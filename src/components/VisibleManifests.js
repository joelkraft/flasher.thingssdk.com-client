// Libs
import React, { Component } from "react";
import { connect } from "react-redux";
import {
    fetchManifests,
    saveManifest,
    createManifest
} from "../actions/manifests";
import ManifestEdit from "./ManifestEdit";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { getIdFromUrl } from "../util";
import { apiUrl } from "../config";

const emptyManifest = {
    name: "",
    version: "",
    board: "",
    revision: "",
    description: "",
    download: "",
    flash: {
        frequency: "",
        images: [
            {
                address: "",
                path: "",
                sha: ""
            }
        ]
    }
};

function getVisibleManifests(manifests, filter) {
    console.log(manifests, filter)
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
    open: ownProps.open,
    token: state.authenticate.token,
    isAdmin: state.user.info.isAdmin
});

const mapDispatchToProps = dispatch => {
    return {
        handleSubmitCreate: (item, token) => {
            return dispatch(createManifest(item, token));
        },
        handleSubmitSave: (item, token) => {
            return dispatch(saveManifest(item, token));
        },
        fetchManifestsOnMount: token => dispatch(fetchManifests(token))
    };
};

class ManifestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            currentManifest: {}
        };
    }
    createNew() {
        return this.setState({
            ...this.state,
            showModal: true,
            currentManifest: { ...emptyManifest, isAuthor: true, isNew: true }
        });
    }
    handleSubmit(isNew) {
        if (isNew) {
            return () =>
                this.props
                    .handleSubmitCreate(
                        this.state.currentManifest,
                        this.props.token
                    )
                    .then(() => {
                        this.setState({
                            ...this.state,
                            showModal: false
                        });
                    });
        }
        return () =>
            this.props
                .handleSubmitSave(this.state.currentManifest, this.props.token)
                .then(() => {
                    this.setState({
                        ...this.state,
                        showModal: false
                    });
                });
    }
    open(item) {
        const authHeaderValue = `Bearer: ${this.props.token}`;
        const id = getIdFromUrl(item.manifest);
        axios
            .get(`${apiUrl.root}/manifests/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeaderValue
                }
            })
            .then(({ data }) => {
                this.setState({
                    ...this.state,
                    currentManifest: {
                        ...emptyManifest,
                        ...data,
                        ...item
                    },
                    showModal: true,
                    modalMode: "Edit"
                });
            })
            .catch(err => {
                throw err;
            });
    }
    close() {
        this.setState({ showModal: false });
    }
    handleChange(key, value, index) {
        let flash = null;
        if (["address", "path", "sha"].indexOf(key) > -1) {
            if (typeof index === "undefined") {
                throw new Error("No index supplied for Flash image");
            }
            this.setState({
                ...this.state,
                currentManifest: {
                    ...this.state.currentManifest,
                    flash: {
                        ...this.state.currentManifest.flash,
                        images: this.state.currentManifest.flash.images.map(
                            (image, imageIndex) => {
                                if (imageIndex === index) {
                                    return {
                                        ...image,
                                        [key]: value
                                    };
                                }
                                return image;
                            }
                        )
                    }
                }
            });
        } else if (key === "frequency") {
            this.setState({
                ...this.state,
                currentManifest: {
                    ...this.state.currentManifest,
                    flash: {
                        ...this.state.currentManifest.flash,
                        [key]: value
                    }
                }
            });
        } else {
            this.setState({
                ...this.state,
                currentManifest: {
                    ...this.state.currentManifest,
                    [key]: value
                }
            });
        }
    }
    deleteFlashImage(indexToRemove) {
        this.setState({
            ...this.state,
            currentManifest: {
                ...this.state.currentManifest,
                flash: {
                    ...this.state.currentManifest.flash,
                    images: [
                        ...this.state.currentManifest.flash.images.slice(
                            0,
                            indexToRemove
                        ),
                        ...this.state.currentManifest.flash.images.slice(
                            indexToRemove + 1
                        )
                    ]
                }
            }
        });
    }
    createFlashImage() {
        this.setState({
            ...this.state,
            currentManifest: {
                ...this.state.currentManifest,
                flash: {
                    ...this.state.currentManifest.flash,
                    images: [
                        ...this.state.currentManifest.flash.images,
                        {
                            address: "",
                            path: "",
                            sha: ""
                        }
                    ]
                }
            }
        });
    }

    componentDidMount() {
        const { token } = this.props;

        this.props.fetchManifestsOnMount(token).catch(err => {
            throw err;
        });
    }
    render() {
        const firstColumn = 2;
        const secondColumn = 10;
        return (
            <div>
                <Row>
                    <Col lg={firstColumn} md={firstColumn} />
                    <Col lg={secondColumn} md={secondColumn}>
                        <Button
                            bsStyle="primary"
                            onClick={this.createNew.bind(this)}
                        >
                            Create new manifest
                        </Button>
                    </Col>
                </Row>
                <hr />
                <div className="table-responsive">
                    <ManifestEdit
                        close={this.close.bind(this)}
                        showModal={this.state.showModal}
                        handleChange={this.handleChange.bind(this)}
                        deleteFlashImage={this.deleteFlashImage.bind(this)}
                        createFlashImage={this.createFlashImage.bind(this)}
                        manifestDetails={this.state.currentManifest}
                        isAdmin={this.props.isAdmin}
                        handleSubmit={this.handleSubmit(this.state.currentManifest.isNew).bind(this)}
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
                                                    name: "PUBLISHED"
                                                },
                                                {
                                                    type: "danger",
                                                    name: "UNPUBLISHED"
                                                }
                                            )}
                                        </td>
                                        <td>
                                            {renderLabel(isAuthor, {
                                                type: "info",
                                                name: "AUTHOR"
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToManifestListProps, mapDispatchToProps)(
    ManifestList
);
