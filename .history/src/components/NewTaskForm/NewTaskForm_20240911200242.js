import React from "react";

import "./NewTaskForm.css";

export default class NewTaskForm extends React.Component {
  state = {
    descriptionText: "",
  }

  render() {
    return(
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    )
  };
};