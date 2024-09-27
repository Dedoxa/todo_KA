import React from 'react'

import Task from '../Task/Task'

import './TaskList.css'

const TaskList = ({ data }) => {
  const tasks = data.map((item) => {
    const { id, liClass = '', ...itemProps } = item

    return (
      <li key={id} className={liClass}>
        <Task {...itemProps} />
      </li>
    )
  })

  return <ul className="todo-list"> {tasks} </ul>
}

export default TaskList
