import React from "react";
import TasksFilter from "../TasksFilter/TasksFilter";

import "./Footer.css";

const Footer = ({data, tasksSumm, onClearCompleted, ...filterFunctions}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksSumm} items left</span>
      <TasksFilter/>
      <button className="clear-completed" onClick={() => onClearCompleted()}>Clear completed</button>
    </footer>
  );
};

// Footer.defaultProps

export default Footer;
