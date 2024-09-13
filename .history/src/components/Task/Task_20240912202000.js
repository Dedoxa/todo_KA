import React from "react";

import "./Task.css";

export default class Task extends React.Component {

  render() {

    const {
      descriptionText,
      createdText,
      onDeleted,
      done,
      onToggleDone,
    } = this.props;
    
    let classNames = "description";
    if (done) {
      classNames += " completed";
    }

    return (
      <li key={id}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label>
            <span className={classNames} onClick={onToggleDone}>
              {descriptionText}
            </span>
            <span className="created">{createdText}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        </li>
    );
  }
}
