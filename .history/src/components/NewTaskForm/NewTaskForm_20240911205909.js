import React from 'react'

import './NewTaskForm.css'

export default class NewTaskForm extends React.Component {
  state = {
    descriptionText: '',
  };

  onInputChange = (e) => {
    // this.setState({
    //   descriptionText: e.target.value,
    // });
    console.log(e.target.value)
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
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          autoFocus
          onChange={this.onInputChange}
          placeholder="What needs to be done?"
          value={this.state.descriptionText}
        />
      </form>
    )
  }
}
