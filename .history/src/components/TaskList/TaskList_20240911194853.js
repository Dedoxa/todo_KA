import React from "react";
import Task from "../Task/Task";

import "./TaskList.css";

const TaskList = ({ data, onDeleted }) => {
  const tasks = data.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id}>
        <Task
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        />
      </li>
    );
  });

  return <ul className="todo-list"> {tasks} </ul>;
};

export default TaskList;
