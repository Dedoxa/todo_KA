import React, { useState } from 'react'

import './NewTaskForm.css'

const NewTaskForm = () => {
  const { descriptionText, onInputChange } = useState('')
  const { minutes, onMinutesChange } = useState('')
  const { seconds, onSecondsChange } = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (descriptionText.trim() !== '') {
      this.props.onItemAdded(descriptionText, minutes, seconds)
      this.setState({
        descriptionText: '',
        minutes: '',
        seconds: '',
      })
    }
  }

  return (
    <form
      className="new-todo-form"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          this.onSubmit(e)
        }
      }}
    >
      <input
        type="text"
        className="new-todo"
        autoFocus
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="What needs to be done?"
        value={this.state.descriptionText}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        value={this.state.minutes}
        onChange={(e) => onMinutesChange(e.target.value)}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={this.state.seconds}
        onChange={(e) => onSecondsChange(e.target.value)}
      />
    </form>
  )
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {
    alert('NewTaskForm.defaultFunction')
  },
  onInputChange: () => {
    alert('NewTaskForm.defaultFunction')
  },
}

export default NewTaskForm
