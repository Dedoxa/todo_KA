import React from "react";
import PropTypes from "prop-types";
import TasksFilter from "../TasksFilter/TasksFilter";

import "./Footer.css";

export default class Footer extends React.Component {
  static defaultProps = {
    data: [
      {
        descriptionText: "Footer.defaultTask",
        createdText: "Footer.defaultTask",
        done: false,
        hidden: false,
        id: -1,
      },
    ],
    footerFilter: "default",
    tasksSumm: "defaultTasksSumm",
    onClearCompleted: () => {
      alert("Footer.defaultFunction");
    },
  };

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    tasksSumm: PropTypes.number,
    onClearCompleted: PropTypes.func,
  }

  render() {
    const { data, tasksSumm, onClearCompleted, ...filterFunctions } =
      this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{tasksSumm} items left</span>
        <TasksFilter {...filterFunctions} />
        <button className="clear-completed" onClick={() => onClearCompleted()}>
          Clear completed
        </button>
      </footer>
    );
  }
}
