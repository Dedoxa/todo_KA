import React from 'react'

import TasksFilter from '../TasksFilter/TasksFilter'

import './Footer.css'

 const Footer = () => {
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

Footer.defaultProps = {
  tasksSumm: 'defaultTasksSumm',
  onClearCompleted: () => {
    alert('Footer.defaultFunction')
  },
}

export default Footer
