// Libs
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import fetch from "isomorphic-fetch";

// Actions
import {
    fetchManifests,
    saveManifest,
    createManifest,
    deleteManifest
} from "../../actions/manifests";

// Components
import ManifestEdit from "./ManifestEdit";
import ManifestList from "./ManifestList";
import { Row, Col, Button } from "react-bootstrap";

// Helpers
import { getIdFromUrl } from "../../util";
import { apiUrl } from "../../config";

// This provides labels for the form to create new manifests
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

// Filters the manifest list view
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

const mapStateToManifestsMainProps = state => ({
    manifests: getVisibleManifests(state.manifests.items, state.manifestFilter),
    token: state.authenticate.token,
    isAdmin: state.user.info.isAdmin
});

const mapDispatchToManifestMainProps = dispatch => {
    return {
        handleSubmitCreate: (item, token) =>
            dispatch(createManifest(item, token)),
        handleSubmitSave: (item, token) => dispatch(saveManifest(item, token)),
        getManifests: token => dispatch(fetchManifests(token)),
        deleteManifest: (id, token) => dispatch(deleteManifest(id, token))
    };
};

class ManifestsMain extends Component {
    state = {
        showModal: false,
        currentManifest: {}
    };
    createNew = () => {
        this.setState({
            showModal: true,
            currentManifest: { ...emptyManifest, isAuthor: true, isNew: true }
        });
    };
    resetPage = () => {
        const { token, getManifests } = this.props;
        this.setState({
            showModal: false
        });
        getManifests(token);
    };
    handleSubmit = isNew => {
        const { currentManifest } = this.state;
        const { token, handleSubmitCreate, handleSubmitSave } = this.props;

        const handleCreate = () =>
            handleSubmitCreate(currentManifest, token)
                .then(this.resetPage)
                .catch(err => {
                    throw err;
                });

        const handleSave = () =>
            handleSubmitSave(currentManifest, token)
                .then(this.resetPage)
                .catch(err => {
                    throw err;
                });

        if (isNew) {
            return handleCreate;
        }
        return handleSave;
    };
    handleDelete = manifestUrl => {
        const id = getIdFromUrl(manifestUrl);
        const token = this.props.token;
        this.props.deleteManifest(id, token).then(this.resetPage).catch(err => {
            throw err;
        });
    };
    openManifest = item => {
        const authHeaderValue = `Bearer ${this.props.token}`;
        const id = getIdFromUrl(item.manifest);
        fetch(`${apiUrl.root}/manifests/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeaderValue
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
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
    };
    closeManifest = () => {
        this.setState({ showModal: false });
    };

    handleChange = (key, value, index) => {
        const isFlashKey = key => ["address", "path", "sha"].indexOf(key) > -1;
        const validateFlashKeyIndex = index => {
            if (typeof index === "undefined") {
                throw new Error("No index supplied for Flash image");
            }
        };
        const getNewFlashState = (key, value, index) => ({
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

        const isFrequencyKey = key => key === "frequency";
        const getNewFrequencyState = (key, value) => ({
            currentManifest: {
                ...this.state.currentManifest,
                flash: {
                    ...this.state.currentManifest.flash,
                    [key]: value
                }
            }
        });

        const getNewManifestState = (key, value) => ({
            currentManifest: {
                ...this.state.currentManifest,
                [key]: value
            }
        });

        if (isFlashKey(key)) {
            // Flash objects are nested and in an array
            validateFlashKeyIndex(index);
            this.setState(getNewFlashState(key, value, index));
        } else if (isFrequencyKey(key)) {
            // Frequency is nested
            this.setState(getNewFrequencyState(key, value));
        } else {
            // All other keys are flat
            this.setState(getNewManifestState(key, value));
        }
    };

    deleteFlashImage = indexToRemove => {
        this.setState({
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
    };
    createFlashImage = () => {
        this.setState({
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
    };

    componentDidMount() {
        const { token, getManifests } = this.props;

        // Call the API for viewable manifests
        getManifests(token).catch(err => {
            throw err;
        });
    }
    render() {
        const firstColumn = 2;
        const secondColumn = 10;
        return (
            <Col sm={9} smOffset={3} md={10} mdOffset={2} className="main">
                <h1 className="page-header">Manifests</h1>
                <Row>
                    <Col lg={firstColumn} md={firstColumn} />
                    <Col lg={secondColumn} md={secondColumn}>
                        <Button
                            bsStyle="primary"
                            id="createManifestButton"
                            onClick={this.createNew}
                        >
                            Create new manifest
                        </Button>
                    </Col>
                </Row>
                <hr />
                <div className="table-responsive">
                    <ManifestEdit
                        closeManifest={this.closeManifest}
                        showModal={this.state.showModal}
                        handleChange={this.handleChange}
                        deleteFlashImage={this.deleteFlashImage}
                        createFlashImage={this.createFlashImage}
                        manifestDetails={this.state.currentManifest}
                        isAdmin={this.props.isAdmin}
                        handleSubmit={this.handleSubmit(
                            this.state.currentManifest.isNew
                        )}
                    />
                    <ManifestList
                        manifests={this.props.manifests}
                        openManifest={this.openManifest}
                        handleDelete={this.handleDelete}
                        isAdmin={this.props.isAdmin}
                    />
                </div>
            </Col>
        );
    }
}

ManifestsMain.propTypes = {
    token: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    manifests: PropTypes.array.isRequired,
    handleSubmitSave: PropTypes.func.isRequired,
    handleSubmitCreate: PropTypes.func.isRequired,
    getManifests: PropTypes.func.isRequired,
    deleteManifest: PropTypes.func.isRequired
};

export { ManifestsMain };

export default connect(
    mapStateToManifestsMainProps,
    mapDispatchToManifestMainProps
)(ManifestsMain);
