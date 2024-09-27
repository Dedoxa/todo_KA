import React from 'react'

import './TasksFilter.css'

const TasksFilter = ({ onShowAll }) => {
  return (
    <ul className="filters">
      <li>
        <button onClick={() => console.log('Filtering by All is working')} className="selected">
          All
        </button>
      </li>
      <li>
        <button onClick={() => console.log('Filtering by Active is working')}>Active</button>
      </li>
      <li>
        <button onClick={() => console.log('Filtering by Completed is working')}>Completed</button>
      </li>
    </ul>
  )
}

export default TasksFilter
