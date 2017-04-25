import React, { Component } from "react";
import {
    Modal,
    Button,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";

class ManifestEdit extends Component {
    render() {
        const {
            manifest,
            name,
            version,
            board,
            revision,
            isAuthor,
            published
        } = this.props.manifestDetails;
        return (
            <Modal show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Manifest
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        {Object.keys(this.props.manifestDetails).map(key => {
                            return (
                                <FormGroup controlId="formBasicText">
                                    <ControlLabel>
                                        {key}
                                    </ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.props.manifestDetails[key]}
                                        placeholder="Enter text"
                                        onChange={e => {this.props.handleChange(key, e.target.value)}}
                                    />
                                    <FormControl.Feedback />
                                </FormGroup>
                            );
                        })}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.close}>
                        Submit
                    </Button>
                    <Button onClick={this.props.close}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ManifestEdit;
