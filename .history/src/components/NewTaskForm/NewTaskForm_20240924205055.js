import React from "react";
import PropTypes from "prop-types";

import "./NewTaskForm.css";

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onItemAdded: () => {
      alert("NewTaskForm.defaultFunction");
    },
    onInputChange: () => {
      alert("NewTaskForm.defaultFunction");
    },
  };

  static propTypes = {
    onItemAdded: PropTypes.func,
    onInputChange: PropTypes.func,
  };

  state = {
    descriptionText: "",
  };

  // onInputChange = (e) => {
  //   this.setState({
  //     descriptionText: e.target.value,
  //   });
  // };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.descriptionText);
    this.setState({
      descriptionText: "",
    });
  };

  render() {
    const { onInputChange } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          autoFocus
          onChange={onInputChange}
          placeholder="What needs to be done?"
          value={this.state.descriptionText}
        />
      </form>
    );
  }
}
