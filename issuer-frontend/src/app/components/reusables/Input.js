import React from "react";

const Input = props => {
  return (
    <input
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      title={props.title}
      onKeyUp={props.onKeyUp}
      className={`input ${props.className ? props.className : ""}`}
      autoFocus={props.autoFocus}
      minLength={props.minLength}
      required={props.required}
      disabled={props.disabled}
    />
  );
};

export default Input;
