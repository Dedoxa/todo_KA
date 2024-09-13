import React from "react";
import TasksFilter from "../TasksFilter/TasksFilter";

import "./Footer.css";

const Footer = ({data, tasksSumm, onClearCompleted}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksSumm} items left</span>
      <TasksFilter tasksList={data}/>
      <button className="clear-completed" onClick={() => onClearCompleted()}>Clear completed</button>
    </footer>
  );
};

export default Footer;
