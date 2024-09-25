import React from "react";

import "./TasksFilter.css";

const TasksFilter = ({ onShowAll, onShowCompleted, onShowActive }) => {
  return (
    <ul className="filters">
      <li>
        <button onClick={() => onShowAll()} className="selected">All</button>
      </li>
      <li>
        <button onClick={() => onShowCompleted()}>Active</button>
      </li>
      <li>
        <button onClick={() => onShowActive()}>Completed</button>
      </li>
    </ul>
  );
};

TasksFilter.defaultProps = {
  onShowAll: () => {alert("TasksFilter.defaultfunction")},
  onShowCompleted: () => {alert("TasksFilter.defaultfunction")},
  onShowActive: () => {alert("TasksFilter.defaultfunction")}
}

export default TasksFilter;
