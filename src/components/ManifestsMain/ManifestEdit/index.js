import React, { Component } from "react";
import EditForm from "./EditForm";
import { Modal, Button, Label } from "react-bootstrap";

class ManifestEdit extends Component {
    render() {
        const {
            name,
            version,
            board,
            revision,
            isAuthor,
            published,
            description,
            download,
            flash,
            isNew
        } = this.props.manifestDetails;
        const { isAdmin } = this.props;
        const getMode = (isNew, isEditor) => {
            if (isNew === "New") return "New";
            return isEditor ? "Edit" : "View";
        };
        const formOrder = [
            { name: "name", value: name },
            { name: "board", value: board },
            { name: "revision", value: revision },
            { name: "version", value: version },
            {
                name: "description",
                value: description,
                componentClass: "textarea"
            },
            { name: "download", value: download },
            { name: "flash", value: flash }
        ];
        const isEditor = isAuthor || isAdmin;
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeManifest}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {getMode(isNew, isEditor)} Manifest
                    </Modal.Title>
                    {isAuthor
                        ? <Label bsStyle="info">AUTHOR</Label>
                        : null}{" "}
                    {published
                        ? <Label bsStyle="success">PUBLISHED</Label>
                        : <Label bsStyle="danger">UNPUBLISHED</Label>}
                </Modal.Header>
                <Modal.Body>
                    {
                        <EditForm
                            items={formOrder}
                            handleChange={this.props.handleChange}
                            deleteFlashImage={this.props.deleteFlashImage}
                            createFlashImage={this.props.createFlashImage}
                            editable={isEditor}
                            onSubmit={this.props.handleSubmit}
                        />
                    }
                </Modal.Body>
                <Modal.Footer>
                    {isEditor
                        ? <Button
                              bsStyle="primary"
                              onClick={this.props.handleSubmit}
                          >
                              {isNew ? "Create" : "Save"}
                          </Button>
                        : null}
                    <Button onClick={this.props.closeManifest}>
                        {isEditor ? "Cancel" : "Close"}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ManifestEdit;
