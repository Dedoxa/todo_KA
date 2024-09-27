import React from 'react'

import './Task.css'

const Task = ({ descriptionText, createdText, inputClass, inputType, inputDefaultValue }) => {
  function AdditionalImput(props) {
    if (inputClass) {
      return <input type={inputType} className={inputClass} value={inputDefaultValue}></input>
    } else {
    }
  }

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
      <input type={inputType} className={inputClass} value={inputDefaultValue}></input>
    </span>
  )
}

export default Task
