import React from "react";

import "./Task.css";

const Task = ({
  descriptionText,
  createdText,
  input2Type,
  input2defaultValue,
}) => {

  // let AdditionalInput;

  // if (input2Class) {
  //   AdditionalInput = (
  //     <input type={input2Type} className={input2Class} value={input2defaultValue}></input>
  //   )
  // } else {
  //   AdditionalInput = ""
  // }

  return (
    <span>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{descriptionText}</span>
          <span className="created">{createdText}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {/* <AdditionalInput /> */}
    </span>
  );
};

export default Task;
