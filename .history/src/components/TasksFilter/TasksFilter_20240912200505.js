import React from 'react'

import './TasksFilter.css'

const TasksFilter = ({ tasksList }) => {
  return (
    <ul className="filters">
      <li>
        <button className="selected">All</button>
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
