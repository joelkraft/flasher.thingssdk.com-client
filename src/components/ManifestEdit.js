import React, { Component } from "react";
import {
    Modal,
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
    Label,
    Form,
    Col,
    Panel,
    ListGroup,
    ListGroupItem
} from "react-bootstrap";
import { capitalize } from "../util";

const FormItem = ({ name, value, handleChange, editable }) => {
    return (
        <FormGroup controlId="formBasicText">
            <Col componentClass={ControlLabel} sm={4}>
                {capitalize(name)}
            </Col>
            <Col sm={8}>
                {editable
                    ? <FormControl
                          type="text"
                          value={value}
                          placeholder={`Enter ${name}`}
                          onChange={e => {
                              handleChange(name, e.target.value);
                          }}
                      />
                    : <FormControl.Static>
                          {value}
                      </FormControl.Static>}
            </Col>
        </FormGroup>
    );
};

const FlashGroup = ({ group, editable, handleChange, header }) => (
    <Panel header={header.toString()}>
        {group.map(({ name, value }, index) => (
            <FormItem
                key={index}
                name={name}
                value={value}
                editable={editable}
                handleChange={handleChange}
            />
        ))}
    </Panel>
);

const FlashPanel = ({ flash, editable, handleChange = { handleChange } }) => {
    const { frequency, images } = flash;
    return (
        <Panel header="Flash">
            <ListGroup fill>
                <ListGroupItem>
                    <FormItem
                        name="Frequency"
                        value={frequency}
                        editable={editable}
                        handleChange={handleChange}
                    />
                </ListGroupItem>
            </ListGroup>
            {images.map(({ address, path, sha }, index) => {
                const group = [
                    { name: "address", value: address },
                    { name: "path", value: path },
                    { name: "sha", value: sha }
                ];
                return (
                    <FlashGroup
                        handleChange={handleChange}
                        editable={editable}
                        group={group}
                        key={index}
                        header={index}
                    />
                );
            })}
        </Panel>
    );
};

const EditForm = ({ items, handleChange, editable }) => (
    <Form horizontal>
        {items.map(
            ({ name, value, type }, index) =>
                (name === "flash"
                    ? <FlashPanel
                          flash={value}
                          editable={editable}
                          key={index}
                      />
                    : <FormItem
                          index={index}
                          value={value}
                          name={name}
                          type={type}
                          handleChange={handleChange}
                          key={index}
                          editable={editable}
                      />)
        )}
    </Form>
);

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
            flash
        } = this.props.manifestDetails;
        const { isAdmin } = this.props;
        const formOrder = [
            { name: "name", value: name },
            { name: "board", value: board },
            { name: "revision", value: revision },
            { name: "version", value: version },
            { name: "description", value: description, type: "textarea" },
            { name: "download", value: download },
            { name: "flash", value: flash }
        ];
        const isEditor = isAuthor || isAdmin;
        return (
            <Modal show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isEditor ? "Edit" : "View"} Manifest
                    </Modal.Title>
                    {isAuthor ? <Label bsStyle="info">AUTHOR</Label> : null}
                    &nbsp;
                    {published
                        ? <Label bsStyle="success">PUBLISHED</Label>
                        : <Label bsStyle="danger">UNPUBLISHED</Label>}
                </Modal.Header>
                <Modal.Body>
                    {
                        <EditForm
                            items={formOrder}
                            handleChange={this.props.handleChange}
                            editable={isEditor}
                        />
                    }
                </Modal.Body>
                <Modal.Footer>
                    {isEditor
                        ? <Button
                              bsStyle="primary"
                              onClick={this.props.handleSubmit}
                          >
                              Submit
                          </Button>
                        : null}
                    <Button onClick={this.props.close}>
                        {isEditor ? "Cancel" : "Close"}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ManifestEdit;
