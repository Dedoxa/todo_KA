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

TaskList.defaultProps = {
  data: [
    {
      descriptionText: 'TaskList.defaultTask',
      dateOfCreation: 'TaskList.defaultDate',
      edit: false,
      done: false,
      hidden: false,
      id: -1,
    },
  ],
  onDeleted: () => {
    alert('TaskList.defaultFunction')
  },
  onToggleDone: () => {
    alert('TaskList.defaultFunction')
  },
  onEdit: () => {
    alert('TaskList.defaultFunction')
  },
  onRewrite: () => {
    alert('TaskList.defaultFunction')
  },
}

export default TaskList
