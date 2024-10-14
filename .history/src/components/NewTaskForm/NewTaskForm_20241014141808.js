import React, { useState } from 'react'

import './NewTaskForm.css'

const NewTaskForm = () => {
  const {  } = useState();

  state = {
    descriptionText: '',
    minutes: '',
    seconds: '',
  }

  onInputChange = (e) => {
    this.setState({
      descriptionText: e.target.value,
    })
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.onSubmit(e)
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { descriptionText, minutes, seconds } = this.state
    if (descriptionText.trim() !== '') {
      this.props.onItemAdded(descriptionText, minutes, seconds)
      this.setState({
        descriptionText: '',
        minutes: '',
        seconds: '',
      })
    }
  }

  onMinutesChange = (e) => {
    this.setState({ minutes: e.target.value })
  }

  onSecondsChange = (e) => {
    this.setState({ seconds: e.target.value })
  }

  render() {
    return (
      <form className="new-todo-form" onKeyDown={this.onKeyDown}>
        <input
          type="text"
          className="new-todo"
          autoFocus
          onChange={this.onInputChange}
          placeholder="What needs to be done?"
          value={this.state.descriptionText}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.state.minutes}
          onChange={this.onMinutesChange}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.state.seconds}
          onChange={this.onSecondsChange}
        />
      </form>
    )
  }
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
