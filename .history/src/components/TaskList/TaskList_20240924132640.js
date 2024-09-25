import React from "react";
import Task from "../Task/Task";

import "./TaskList.css";

export default class TaskList extends React.Component {

  redner() {

    { data, onDeleted, onToggleDone } = this.props;
    
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
};

TaskList.defaultProps = {
  data: [{
      descriptionText: "TaskList.defaultTask",
      createdText: "TaskList.defaultTask",
      done: false,
      hidden: false,
      id: -1,
  }],
  onDeleted: () => {alert("TaskList.defaultFunction")},
  onToggleDone: () => {alert("TaskList.defaultFunction")}
}
