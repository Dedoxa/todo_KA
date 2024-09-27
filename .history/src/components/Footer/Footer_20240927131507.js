import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'

import './Footer.css'

export default class Footer extends React.Component {
  static defaultProps = {
    tasksSumm: 'defaultTasksSumm',
    onClearCompleted: () => {
      alert('Footer.defaultFunction')
    },
  };

  static propTypes = {
    tasksSumm: PropTypes.number,
    onClearCompleted: PropTypes.func,
  };

  render() {
    const { tasksSumm, onClearCompleted, ...otherArgs } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{tasksSumm} items left</span>
        <TasksFilter {...otherArgs} />
        <button className="clear-completed" onClick={() => onClearCompleted()}>
          Clear completed
        </button>
      </footer>
    )
  }
}
