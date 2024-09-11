import React from "react";
import Footer from './components/Footer/Footer';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';

import "./App.css";

const tasks = [

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

  {
    liClass: "completed",
    divClass: "view",
    inputClass: "toggle",
    inputType: "checkbox",
    span1Class: "description",
    span1TextContent: "Completed task",
    span2Class: "created",
    span2TextContent: "created 17 seconds ago",
    buttonClass: "icon",
    button1Class: "icon-edit",
    button2Class: "icon-destroy",

  },
  {},
  {}
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
]

const App = () => {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  );
};

export default App;
