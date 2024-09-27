import React from 'react'

import './Task.css'

export default class Task extends React.Component {
  render() {
    /*AdditionalInput() {
      if (inputClass) {
        return (
          <input
            type={inputType}
            className={inputClass}
            value={inputDefaultValue}
          ></input>
        );
      } else {
        return null;
      }
    }*/

    const { done, onToggleDone } = this.state

    const {
      descriptionText,
      createdText,
      onDeleted,
      // inputClass,
      // inputType,
      // inputDefaultValue
    } = this.props

    let classNames = 'description'
    if (done) {
      classNames += ' completed'
    }

    return (
      <span>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={this.onTaskClick} />
          <label>
            <span className={classNames} onClick={this.onTaskClick}>
              {descriptionText}
            </span>
            <span className="created">{createdText}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {/* <AdditionalInput /> */}
      </span>
    )
  }
}
