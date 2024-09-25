import React from "react";
import Task from "../Task/Task";

import "./TaskList.css";

const TaskList = ({ data, onDeleted, onToggleDone }) => {
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
};

TaskList

export default TaskList;
