import React from 'react'

import './TasksFilter.css'

export default class TasksFilter extends React.Component {
  static defaultProps = {
    onShowAll: () => {
      alert('Footer.TasksFilter.defaultfunction')
    },
    onShowCompleted: () => {
      alert('Footer.TasksFilter.defaultfunction')
    },
    onShowActive: () => {
      alert('Footer.TasksFilter.defaultfunction')
    },
  };

  render() {
    const { onShowAll, onShowCompleted, onShowActive } = this.props
    return (
      <ul className="filters">
        <li>
          <button onClick={() => onShowAll()} className="selected">
            All
          </button>
        </li>
        <li>
          <button onClick={() => onShowCompleted()}>Active</button>
        </li>
        <li>
          <button onClick={() => onShowActive()}>Completed</button>
        </li>
      </ul>
    )
  }
}
