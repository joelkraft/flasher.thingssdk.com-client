import React from "react";
import { Button, Label } from "react-bootstrap";

const FlashHeader = ({ header, editable, deleteFlashImage }) =>
    <div>
        <Label bsStyle="info">
            {header}
        </Label>
        {editable
            ? <Button
                  bsStyle="danger"
                  className="btn-xs pull-right"
                  onClick={deleteFlashImage}
              >
                  Delete
              </Button>
            : null}
    </div>;

export default FlashHeader;
