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
    if (Task.done) {
      classNames += " completed";
    }

    if (Task.hidden) {
      classNames += " hidden";
    }

    return (
      <li key={Task.id} className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={Task.onToggleDone} />
          <label>
            <span className="description" onClick={Task.onToggleDone}>
              {Task.descriptionText}
            </span>
            <span className="created">{Task.createdText}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={Task.onDeleted}></button>
        </div>
        </li>
    );
  }
}
