import React from 'react'

import Task from '../Task/Task'

import './TaskList.css'

const TaskList = (data, onDeleted, onToggleDone, onEdit, onRewrite) => {
  const tasks = data.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        {...itemProps}
        key={id}
        id={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onEdit={() => onEdit(id)}
        onRewrite={onRewrite}
      />
    )
  })

  return <ul className="todo-list"> {tasks} </ul>
}

export default TaskList
