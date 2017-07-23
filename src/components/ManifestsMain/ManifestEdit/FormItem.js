import React from "react";
import { FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import { capitalize } from "../../../util";

const FormItem = ({
    name,
    value,
    handleChange,
    editable,
    flashIndex,
    componentClass
}) => {
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
                          componentClass={componentClass}
                      />
                    : <FormControl.Static>
                          {value}
                      </FormControl.Static>}
            </Col>
        </FormGroup>
    );
};

export default FormItem;
