import React, { Component } from "react";
import {
    Modal,
    Button,
    FormGroup,
    FormControl,
    ControlLabel,
    Table,
    Label,
    Form,
    Col
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

const EditForm = ({ items, handleChange, editable }) => (
    <Form horizontal>
        {items
            .reduce((array, { name, value }) => {
                if (Array.isArray(value)) {
                    const flashes = value.reduce((result, flashItem, index) => {
                        const flash = Object.keys(flashItem).filter(key=>key!=='_id').map(key => {
                            return {
                                name: `${name} ${capitalize(key)} ${index}`,
                                value: flashItem[key]
                            };
                        });
                        return [ ...result, ...flash ]
                    }, []);
                    return [...array, ...flashes];
                }
                return [...array, { name, value }];
            })
            .map(({ name, value }, index) => (
                <FormItem
                    index={index}
                    value={value}
                    name={name}
                    handleChange={handleChange}
                    key={index}
                    editable={editable}
                />
            ))}
    </Form>
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
                    {
                        <EditForm
                            items={formOrder}
                            handleChange={this.props.handleChange}
                            editable={isAuthor}
                        />
                    }
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
