import React from "react";
import PropTypes from "prop-types";

import "./Task.css";

export default class Task extends React.Component {
  static defaultProps = {
    id: -1,
    descriptionText: "defaultText",
    createdText: "defaultText",
    onDeleted: () => {
      alert("Task.defaultFunction");
    },
    done: false,
    hidden: false,
    onToggleDone: () => {
      alert("Task.defaultFunction");
    },
  };

  static propTypes = {
    onDeleted: (props, propName, componentName) => {
      const value = props[propName];
      if (typeof value === "function" && !isNaN(value)) {
        return null;
      }

      return new TypeError(`${componentName}.${propName} must be a function.`);
    },
  };

  render() {
    const {
      id,
      descriptionText,
      createdText,
      onDeleted,
      done,
      hidden,
      onToggleDone,
    } = this.props;

    let classNames = "";
    if (done) {
      classNames += " completed";
    }

    if (hidden) {
      classNames += " hidden";
    }

    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label>
            <span className="description" onClick={onToggleDone}>
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
