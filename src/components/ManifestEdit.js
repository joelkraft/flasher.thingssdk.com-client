import React, { Component } from "react";
import {
    Modal,
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
    Table,
    Label
} from "react-bootstrap";
import { capitalize } from "../util";

const FormItem = ({ name, value, index, handleChange }) => {
    return (
        <FormGroup controlId="formBasicText">
            <ControlLabel>
                {capitalize(name)}
            </ControlLabel>
            {Array.isArray(value)
                ? value.map((flash, flashIndex) => (
                      <FormGroup controlId="flash" key={flashIndex}>
                          <FormControl
                              type="text"
                              placeholder="Address"
                              value={flash.address}
                          /><br />
                          <FormControl
                              type="text"
                              placeholder="path"
                              value={flash.path}
                          /><hr />
                      </FormGroup>
                  ))
                : <FormControl
                      type="text"
                      value={value}
                      placeholder={`Enter ${name}`}
                      onChange={e => {
                          handleChange(name, e.target.value);
                      }}
                  />}
            <FormControl.Feedback />
        </FormGroup>
    );
};

const EditForm = ({ items, handleChange }) => (
    <form>
        {items.map(({ name, value }, index) => (
            <FormItem
                index={index}
                value={value}
                name={name}
                handleChange={handleChange}
                key={index}
            />
        ))}
    </form>
);

const DisplayDetails = ({ items }) => (
    <Table striped bordered>
        <thead>
            <tr><th>Name</th><th>Value</th></tr>
        </thead>
        <tbody>
            {items.map(({ name, value }, index) => (
                <tr key={index}>
                    <td>{name}</td><td>{value}</td>
                </tr>
            ))}
        </tbody>
    </Table>
);
class ManifestEdit extends Component {
    render() {
        const {
            manifest,
            name,
            version,
            board,
            revision,
            isAuthor,
            published,
            description,
            download,
            flash
        } = this.props.manifestDetails;
        const formOrder = [
            { name: "name", value: name },
            { name: "board", value: board },
            { name: "revision", value: revision },
            { name: "version", value: version },
            { name: "description", value: description },
            { name: "download", value: download },
            { name: "flash", value: flash }
        ];
        return (
            <Modal show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isAuthor ? "Edit" : "View"} Manifest
                    </Modal.Title>
                    {isAuthor ? <Label bsStyle="info">AUTHOR</Label> : null}
                    &nbsp;
                    {published
                        ? <Label bsStyle="success">PUBLISHED</Label>
                        : <Label bsStyle="danger">UNPUBLISHED</Label>}
                </Modal.Header>
                <Modal.Body>
                    {isAuthor
                        ? <EditForm
                              items={formOrder}
                              handleChange={this.props.handleChange}
                          />
                        : <DisplayDetails items={formOrder} />}
                </Modal.Body>
                <Modal.Footer>
                    {isAuthor
                        ? <Button
                              bsStyle="primary"
                              onClick={this.props.handleSubmit}
                          >
                              Submit
                          </Button>
                        : null}
                    <Button onClick={this.props.close}>
                        {isAuthor ? "Cancel" : "Close"}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ManifestEdit;
