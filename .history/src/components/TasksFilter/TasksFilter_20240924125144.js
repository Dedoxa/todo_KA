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
  onShowAll: () => {alert("Footer.TasksFilter.defaultfunction")},
  onShowCompleted: () => {alert("Footer.TasksFilter.defaultfunction")},
  onShowActive: () => {alert("Footer.TasksFilter.defaultfunction")}
}

export default TasksFilter;
