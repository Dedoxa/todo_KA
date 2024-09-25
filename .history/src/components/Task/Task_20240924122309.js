import React from "react";

import "./Task.css";

export default class Task extends React.Component {

  static defaultProps = {
    id: -1,
    descriptionText: "defaultText",
    onDeleted: () => {},
    done: false,
    hidden: false,
    onToggleDone: () => {},
  }
  
  render() {
    
    // const {
    //   id,
    //   descriptionText,
    //   createdText,
    //   onDeleted,
    //   done,
    //   hidden,
    //   onToggleDone,
    // } = this.props;
    
    let classNames = "";
    if (Task.defaultProps.done) {
      classNames += " completed";
    }

    if (Task.defaultProps.hidden) {
      classNames += " hidden";
    }

    return (
      <li key={Task.defaultProps.id} className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={Task.defaultProps.onToggleDone} />
          <label>
            <span className="description" onClick={Task.defaultProps.onToggleDone}>
              {Task.defaultProps.descriptionText}
            </span>
            <span className="created">{Task.defaultProps.createdText}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={Task.defaultProps.onDeleted}></button>
        </div>
        </li>
    );
  }
}
