import React from "react";

import "./Task.css";

export default class Task extends React.Component {
  state = {
    done: false,
  };

  render() {
    /*AdditionalInput() {
      if (inputClass) {
        return (
          <input
            type={inputType}
            className={inputClass}
            value={inputDefaultValue}
          ></input>
        );
      } else {
        return null;
      }
    }*/

    const {done} = this.state

    const {
      descriptionText,
      createdText,
      // inputClass,
      // inputType,
      // inputDefaultValue
    } = this.props

    let classNames = "todo-list li label description";
    if (done) {
      classNames += " li.completed";
    }

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
  }
}
