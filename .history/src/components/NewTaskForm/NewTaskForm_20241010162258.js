import React from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onItemAdded: () => {
      alert('NewTaskForm.defaultFunction')
    },
    onInputChange: () => {
      alert('NewTaskForm.defaultFunction')
    },
  }

  static propTypes = {
    onItemAdded: PropTypes.func,
    onInputChange: PropTypes.func,
  }

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
    if (this.state.descriptionText.trim() !== '') {
      this.props.onItemAdded(this.state.descriptionText)
      this.setState({
        descriptionText: '',
      })
    }
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
        <input type="number" className="new-todo-form__timer" placeholder="Min" onKeyDown={this.onKeyDown} />
        <input type="number" className="new-todo-form__timer" placeholder="Sec" onKeyDown={this.onKeyDown} />
      </form>
    )
  }
}
