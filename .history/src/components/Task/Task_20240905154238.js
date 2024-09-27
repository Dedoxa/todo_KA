import React from 'react'

import './Task.css'

export default class Task extends React.Component {
  state = {
    done: false,
  };

  onTaskClick = () => {
    this.setState(({ done }) => {
      console.log('Clicked')
      return {
        done: !done,
      }
    })
  };

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

    const { done } = this.state

    const {
      descriptionText,
      createdText,
      onDeleted,
      // inputClass,
      // inputType,
      // inputDefaultValue
    } = this.props

    let classNames = '?????????????????'
    if (done) {
      classNames += ' completed'
    }

    return (
      <span>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={this.onTaskClick}>
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
