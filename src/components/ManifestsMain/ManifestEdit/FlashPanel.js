import React from "react";
import FormItem from "./FormItem";
import FlashGroup from "./FlashGroup";
import { Button, Panel, ListGroup, ListGroupItem } from "react-bootstrap";

const FlashPanel = ({
    flash,
    editable,
    handleChange,
    deleteFlashImage,
    createFlashImage
}) => {
    const { frequency, images } = flash;
    return (
        <Panel header="FlashPanel">
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
                        deleteFlashImage={() => deleteFlashImage(index)}
                    />
                );
            })}
            {editable
                ? <Button
                      bsStyle="default"
                      className="pull-right"
                      onClick={createFlashImage}
                  >
                      New Image
                  </Button>
                : null}
        </Panel>
    );
};

export default FlashPanel;
