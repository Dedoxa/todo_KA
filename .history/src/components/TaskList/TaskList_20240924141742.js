import React from "react";
import PropTypes from "prop-types";
import Task from "../Task/Task";

import "./TaskList.css";

export default class TaskList extends React.Component {
  static defaultProps = {
    data: [
      {
        descriptionText: "TaskList.defaultTask",
        createdText: "TaskList.defaultTask",
        done: false,
        hidden: false,
        id: -1,
      },
    ],
    onDeleted: () => {
      alert("TaskList.defaultFunction");
    },
    onToggleDone: () => {
      alert("TaskList.defaultFunction");
    },
  };

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
  }

  render() {
    const { data, onDeleted, onToggleDone } = this.props;

    const tasks = data.map((item) => {
      const { id, ...itemProps } = item;

      return (
        <Task
          {...itemProps}
          key={id}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      );
    });

    return <ul className="todo-list"> {tasks} </ul>;
  }
}
