import React from 'react';

const Input = ({label, name, inputType, placeholder, controlFunc, content}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          className="input"
          name={name}
          type={inputType}
          placeholder={placeholder}
          onChange={controlFunc}
          value={content}
        />
      </div>
    </div>
  );
};

export default Input;
