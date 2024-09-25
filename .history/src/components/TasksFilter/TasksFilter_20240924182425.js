import React from "react";
import PropTypes from "prop-types";

import "./TasksFilter.css";

export default class TasksFilter extends React.Component {
  static defaultProps = {
    onShowAll: () => {
      alert("Footer.TasksFilter.defaultfunction");
    },
    onShowCompleted: () => {
      alert("Footer.TasksFilter.defaultfunction");
    },
    onShowActive: () => {
      alert("Footer.TasksFilter.defaultfunction");
    },
  };

  static propTypes = {
    onShowAll: PropTypes.func,
    onShowCompleted: PropTypes.func,
    onShowActive: PropTypes.func,
  };

  render() {
    const { onShowAll, onShowCompleted, onShowActive } = this.props;

    
    return (
      <ul className="filters">
        <li>
          <button onClick={() => onShowAll()} className="selected">
            All
          </button>
        </li>
        <li>
          <button onClick={() => onShowCompleted()} className="selected">
            Active
          </button>
        </li>
        <li>
          <button onClick={() => onShowActive()} className="selected">
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
