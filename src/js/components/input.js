import React from 'react';

const Input = ({type, label, placeholder}) => {
  const inputType = type || 'type';
  const inputLabel = label || 'Field';
  const inputlaceholder = placeholder || 'Enter text';

  return (
    <div className="field">
      <label className="label">{inputLabel}</label>
      <div className="control">
        <input
          className="input"
          type={inputType}
          placeholder={inputlaceholder}
        />
      </div>
    </div>
  );
};

export default Input;
