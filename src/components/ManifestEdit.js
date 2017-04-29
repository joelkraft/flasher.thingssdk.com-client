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

const FormItem = ({ name, value, handleChange, editable, flashIndex }) => {
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
                              handleChange(name, e.target.value, flashIndex);
                          }}
                      />
                    : <FormControl.Static>
                          {value}
                      </FormControl.Static>}
            </Col>
        </FormGroup>
    );
};

const FlashGroup = ({ group, editable, handleChange, header,flashIndex }) => {
    const headerElement = <p><Label bsStyle="info">{header}</Label></p>
    return (
    <Panel header={headerElement}>
        {group.map(({ name, value }, index) => (
            <FormItem
                key={index}
                name={name}
                value={value}
                editable={editable}
                handleChange={handleChange}
                flashIndex={flashIndex}
            />
        ))}
    </Panel>
)};

const FlashPanel = ({ flash, editable, handleChange }) => {
    const { frequency, images } = flash;
    return (
        <Panel header="Flash">
            <ListGroup fill>
                <ListGroupItem>
                    <FormItem
                        name="frequency"
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
                        flashIndex={index}
                    />
                );
            })}
        </Panel>
    );
};

const EditForm = ({ items, handleChange, editable, onSubmit }) => (
    <Form horizontal onSubmit={onSubmit}>
        {items.map(
            ({ name, value, type }, index) =>
                (name === "flash"
                    ? <FlashPanel
                          flash={value}
                          editable={editable}
                          key={index}
                          handleChange={handleChange}
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
