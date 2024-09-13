import React from "react";

import "./NewTaskForm.css";

export default class NewTaskForm extends React.Component {
  state = {
    descriptionText: "",
  };

  onInputChange = (e) => {
    this.setState({
      descriptionText: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.descriptionText)
    this.setState({
      descriptionText: "",
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onInputChange}
          value={this.state.descriptionText}
        />
      </form>
    );
  }
}
