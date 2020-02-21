import React from "react";

const Button = props => {
  return (
    <button
      type={props.type}
      disabled={props.disabled}
      className={`button ${props.className ? props.className : ""}`}
      onClick={props.onClick}
      title={props.title}
    >
      {props.children
        ? props.children
        : props.label
        ? props.label
        : ""}
    </button>
  );
};

export default Button;
