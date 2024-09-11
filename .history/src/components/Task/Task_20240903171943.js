import React from "react";

import "./Task.css";

const Task = ({
  descriptionText,
  createdText,
  input2Class,
  input2Type,
  input2defaultValue,
}) => {
  
  /*
  if liClass
  if Input2
  */

  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">{descriptionText}</span>
        <span className="created">{createdText}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  );
};

export default Task;

{
  /*
<li className="completed">
  <div className="view">
    <input className="toggle" type="checkbox" />
    <label>
      <span className="description">Completed task</span>
      <span className="created">created 17 seconds ago</span>
    </label>
    <button className="icon icon-edit"></button>
    <button className="icon icon-destroy"></button>
  </div>
</li>
<li className="editing">
<div className="view">
  <input className="toggle" type="checkbox" />
  <label>
    <span className="description">Editing task</span>
    <span className="created">created 5 minutes ago</span>
  </label>
  <button className="icon icon-edit"></button>
  <button className="icon icon-destroy"></button>
</div>
<input type="text" className="edit" defaultValue="Editing task" />
</li>
<li>
<div className="view">
  <input className="toggle" type="checkbox" />
  <label>
    <span className="description">Active task</span>
    <span className="created">created 5 minutes ago</span>
  </label>
  <button className="icon icon-edit"></button>
  <button className="icon icon-destroy"></button>
</div>
</li>
*/
}
