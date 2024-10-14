import React from 'react'
// import PropTypes from 'prop-types'

import './TasksFilter.css'

const TasksFilter = (footerFilter, onShowAll, onShowCompleted, onShowActive) => {
  const allClassNames = footerFilter === 'All' ? 'selected' : ''
  const completedClassNames = footerFilter === 'Completed' ? 'selected' : ''
  const activeClassNames = footerFilter === 'Active' ? 'selected' : ''

  return (
    <ul className="filters">
      <li>
        <button onClick={() => onShowAll()} className={allClassNames}>
          All
        </button>
      </li>
      <li>
        <button onClick={() => onShowCompleted()} className={completedClassNames}>
          Active
        </button>
      </li>
      <li>
        <button onClick={() => onShowActive()} className={activeClassNames}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.defaultProps = {
  footerFilter: 'All',
  onShowAll: () => {
    alert('Footer.TasksFilter.defaultfunction')
  },
  onShowCompleted: () => {
    alert('Footer.TasksFilter.defaultfunction')
  },
  onShowActive: () => {
    alert('Footer.TasksFilter.defaultfunction')
  },
}

export default TasksFilter
