import React, { useState } from 'react'

import './NewTaskForm.css'

const NewTaskForm = ({ onItemAdded }) => {
  const [ descriptionText, onInputChange ] = useState('')
  const [ minutes, onMinutesChange ] = useState('')
  const [ seconds, onSecondsChange ] = useState('')

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit(e)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (descriptionText.trim() !== '') {
      onItemAdded(descriptionText, minutes, seconds)
      onInputChange('')
      onMinutesChange('')
      onSecondsChange('')
    }
  }

  return (
    <form className="new-todo-form" onKeyDown={onKeyDown}>
      <input
        type="text"
        className="new-todo"
        autoFocus
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="What needs to be done?"
        value={descriptionText}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={(e) => onMinutesChange(e.target.value)}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={(e) => onSecondsChange(e.target.value)}
      />
    </form>
  )
}

export default NewTaskForm
