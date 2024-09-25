import React from "react";
import TasksFilter from "../TasksFilter/TasksFilter";

import "./Footer.css";

export default class Footer extends React.Component {

  const { data, tasksSumm, onClearCompleted, ...filterFunctions } = this.props;

  return (
    <footer className="footer">
      <span className="todo-count">{tasksSumm} items left</span>
      <TasksFilter {...filterFunctions}/>
      <button className="clear-completed" onClick={() => onClearCompleted()}>Clear completed</button>
    </footer>
  );
};

Footer.defaultProps = {
  data: [{
    descriptionText: "Footer.defaultTask",
    createdText: "Footer.defaultTask",
    done: false,
    hidden: false,
    id: -1,
}],
  tasksSumm: "defaultTasksSumm",
  onClearCompleted: () => {alert("Footer.defaultFunction")},
}
