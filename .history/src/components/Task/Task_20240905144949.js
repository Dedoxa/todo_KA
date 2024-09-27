import React from 'react'

import './Task.css'

export default class Task extends React.Component {
  state = {
    done: false,
    descriptionText: '',
    createdText: '',
    inputClass: '',
    inputType: '',
    inputDefaultValue: '',
  };

  AdditionalImput(data) {
    if (inputClass) {
      return <input type={inputType} className={inputClass} value={inputDefaultValue}></input>
    } else {
      return null
    }
  }

  render() {
    return (
      <span>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">{descriptionText}</span>
            <span className="created">{createdText}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        <AdditionalImput />
      </span>
    )
  }
}
