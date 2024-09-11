import React from "react";

import "./Task.css";

const Task = ({
  descriptionText,
  createdText,
  inputType,
  inputDefaultValue,
}) => {

  // let AdditionalInput;

  // if (input2Class) {
  //   AdditionalInput = (
  //     <input type={inputType} className={input2Class} value={inputDefaultValue}></input>
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
