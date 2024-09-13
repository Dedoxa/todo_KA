import React from "react";

import "./Task.css";

export default class Task extends React.Component {

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

    const {
      descriptionText,
      createdText,
      onDeleted,
      done,
      onToggleDone
    } = this.props;
    
    let classNames = "description";
    if (done) {
      classNames += " completed";
    }

    return (
      <span>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={this.onToggleDone} />
          <label>
            <span className={classNames} onClick={this.onToggleDone}>
              {descriptionText}
            </span>
            <span className="created">{createdText}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {/* <AdditionalInput /> */}
      </span>
    );
  }
}
