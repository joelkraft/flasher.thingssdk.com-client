import React from "react";
import FormItem from "./FormItem";
import FlashHeader from "./FlashHeader";
import { Panel } from "react-bootstrap";

const FlashGroup = ({
    group,
    editable,
    handleChange,
    deleteFlashImage,
    header,
    flashIndex
}) =>
    <Panel
        header={
            <FlashHeader
                header={header}
                editable={editable}
                deleteFlashImage={deleteFlashImage}
            />
        }
    >
        {group.map(({ name, value }, index) =>
            <FormItem
                key={index}
                name={name}
                value={value}
                editable={editable}
                handleChange={handleChange}
                flashIndex={flashIndex}
            />
        )}
    </Panel>;

export default FlashGroup;
