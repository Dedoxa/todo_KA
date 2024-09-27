import React from 'react'

import './Task.css'

const Task = ({ descriptionText, createdText, input2Class, input2Type, input2defaultValue }) => {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">{descriptionText}</span>
        <span className="created">{createdText}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
      {/* <input type={input2Type} className={input2Class} value={input2defaultValue}></input> */}
    </div>
    // <AdditionalInput />
  )
}

export default Task
