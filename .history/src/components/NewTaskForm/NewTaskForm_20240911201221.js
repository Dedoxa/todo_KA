import React from 'react'

import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  state = {
    descriptionText: '',
  };

  onInputChange = (e) => {
    this.setState({
      descriptionText: e.target.value,
    })
  };

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onItemAdded(this.state.descriptionText)
    this.setState({
      descriptionText: '',
    })
  };

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onSubmit={this.onSubmit}
        onChange={this.onInputChange}
      />
    )
  }
}
