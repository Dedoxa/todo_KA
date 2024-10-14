import React from 'react'

import Task from '../Task/Task'

import './TaskList.css'

const TaskList = (tasks, onDeleted, onToggleDone, onEdit, onRewrite) => {
  console.log(tasks)
  const tasks = tasks.map((item) => {
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
