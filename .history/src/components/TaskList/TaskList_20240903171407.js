import React from 'react'

import Task from '../Task/Task'

import './TaskList.css'

const TaskList = ({ data }) => {
  const elements = data.map((item) => {
    const { id, liClass, ...itemProps } = item

    return <li key={id} className={liClass}></li>
  })

  return (
    <ul className="todo-list">
      <Task />
    </ul>
  )
}

export default TaskList
