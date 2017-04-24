import React from "react";

const FormField = ({ 
    label, 
    type, 
    id, 
    placeholder, 
    value,
    onChange
}) => (
    <div className="form-group">
        <label htmlFor={id}>
            { label }
        </label>
        <input
            type={ type || 'text'}
            className="form-control"
            id={id}
            placeholder={ placeholder || ''}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default FormField;
