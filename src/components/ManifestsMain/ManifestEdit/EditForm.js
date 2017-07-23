import React from "react";
import FormItem from "./FormItem";
import FlashPanel from "./FlashPanel";
import { Form } from "react-bootstrap";
const EditForm = ({
    items,
    handleChange,
    deleteFlashImage,
    createFlashImage,
    editable,
    onSubmit
}) =>
    <Form horizontal onSubmit={onSubmit}>
        {items.map(
            ({ name, value, componentClass }, index) =>
                name === "flash"
                    ? <FlashPanel
                          flash={value}
                          editable={editable}
                          key={index}
                          handleChange={handleChange}
                          deleteFlashImage={deleteFlashImage}
                          createFlashImage={createFlashImage}
                      />
                    : <FormItem
                          index={index}
                          value={value}
                          name={name}
                          componentClass={componentClass}
                          handleChange={handleChange}
                          key={index}
                          editable={editable}
                      />
        )}
    </Form>;

export default EditForm;
