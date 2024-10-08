import React from 'react'

import Task from '../Task/Task'

import './TaskList.css'

const TaskList = ({ data }) => {
  const elements = data.map((item) => {
    const { id, liClass = '', ...itemProps } = item

    return (
      <li key={id} className={liClass}>
        <Task {...itemProps} />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
