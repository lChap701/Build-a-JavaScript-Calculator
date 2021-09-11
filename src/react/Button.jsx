import React from "react";

/* Stateless component */
const Button = (props) => {
  return (
    <button id={props.id} className={props.class} onClick={props.onClick}>
      {props.name}
    </button>
  );
};

export default Button;