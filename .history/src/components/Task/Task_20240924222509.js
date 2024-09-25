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
    edit: false,
    done: false,
    hidden: false,
    onToggleDone: () => {
      alert("Task.defaultFunction");
    },
    onEdit: () => {
      alert("Task.defaultFunction");
    },
    onRewrite: () => {
      alert("Task.defaultFunction");
    },
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    descriptionText: PropTypes.string.isRequired,
    dateOfCreation: PropTypes.any.isRequired,
    onDeleted: PropTypes.func.isRequired,
    edit: PropTypes.bool,
    done: PropTypes.bool,
    hidden: PropTypes.bool,
    onToggleDone: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRewrite: PropTypes.func,
  };

  state = {
    descriptionText: this.props.descriptionText,
  }

  onInputChange = (e) => {
    this.setState({
      descriptionText: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.key)
    this.props.onRewrite(this.state.descriptionText, this.props.key);
  };

  render() {
    const {
      id,
      descriptionText,
      dateOfCreation,
      onDeleted,
      edit,
      done,
      hidden,
      onToggleDone,
      onEdit,
    } = this.props;

    let liClassNames = "";
    let divClasses = "view";
    let checkBoxState = "";

    edit ? (liClassNames = "editing") : (liClassNames = "");

    if (done) {
      divClasses += " completed";
      checkBoxState = true;
    } else {
      divClasses.replace(" completed", "");
      checkBoxState = false;
    }

    hidden ? (divClasses += " hidden") : divClasses.replace(" hidden", "");

    return (
      <li key={id} className={liClassNames}>
        <div className={divClasses}>
          <input
            className="toggle"
            type="checkbox"
            onClick={onToggleDone}
            checked={checkBoxState}
            readOnly
          />
          <label>
            <span className="description" onClick={onToggleDone}>
              {descriptionText}
            </span>
            <span className="created">{`created ${formatDistanceToNow(
              dateOfCreation,
              { includeSeconds: true }
            )} ago`}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            value={this.state.descriptionText}
            onChange={this.onInputChange}
          ></input>
        </form>
      </li>
    );
  }
}
