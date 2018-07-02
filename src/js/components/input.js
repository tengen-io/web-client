import React from 'react';

const Input = props => {
  // const inputType = type || 'type';
  // const inputLabel = label || 'Field';
  // const inputValue = value;
  // const inputlaceholder = placeholder || 'Enter text';
  // const inputOnChange = onChange;

  // console.log(props.content);

  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">
        <input
          className="input"
          name={props.name}
          type={props.inputType}
          placeholder={props.placeholder}
          onChange={props.controlFunc}
          value={props.content}
        />
      </div>
    </div>
  );
};

export default Input;
