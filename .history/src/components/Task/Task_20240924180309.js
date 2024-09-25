import React from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

import "./Task.css";

export default class Task extends React.Component {
  static defaultProps = {
    id: -1,
    descriptionText: "defaultText",
    dateOfCreation: "defaultDate",
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
    id: PropTypes.number.isRequired,
    descriptionText: PropTypes.string.isRequired,
    dateOfCreation: PropTypes.object.isRequired,
    onDeleted: PropTypes.func.isRequired,
    done: PropTypes.bool,
    hidden: PropTypes.bool,
    onToggleDone: PropTypes.func.isRequired,
  };

  render() {
    const {
      id,
      descriptionText,
      dateOfCreation,
      onDeleted,
      done,
      hidden,
      onToggleDone,
    } = this.props;

    let divClasses = "view";
    let checkBoxState = "";

    if (done) {
      divClasses += " completed";
      checkBoxState = true;
    } else {
      divClasses.replace(" completed", "");
      checkBoxState = false;
    }

    hidden ? (divClasses += " hidden") : divClasses.replace(" hidden", "");

    return (
      <li key={id}>
        <div className={divClasses}>
          <input
            className="toggle"
            type="checkbox"
            onClick={onToggleDone}
            checked={checkBoxState}
          />
          <label>
            <span className="description" onClick={onToggleDone}>
              {descriptionText}
            </span>
            <span className="created">{`created ${formatDistanceToNow(
              dateOfCreation
            )} ago`}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input
          type="text"
          className="edit"
          value={"Editing task"}
          onChange={() => {
            console.log("edit works");
          }}
        ></input>
      </li>
    );
  }
}
