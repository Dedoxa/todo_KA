import React from "react";
import Footer from './components/Footer/Footer';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';

import "./App.css";

const tasks = [
  {
    liClass: "completed",
    containerClass: "view",
    inputClass: "toggle",
    inputType: "checkbox",
    descriptionClass: "description",
    descriptionText: "Completed task",
    createdClass: "created",
    createdText: "created 17 seconds ago",
    iconClass: "icon",
    buttonEditClass: "icon-edit",
    buttonDestroyClass: "icon-destroy",
  },

  {
    liClass: "completed",
    containerClass: "view",
    inputClass: "toggle",
    inputType: "checkbox",
    descriptionClass: "description",
    descriptionText: "Completed task",
    createdClass: "created",
    createdText: "created 17 seconds ago",
    iconClass: "icon",
    buttonEditClass: "icon-edit",
    buttonDestroyClass: "icon-destroy",
  },

  {
    liClass: "editing",
    containerClass: "view",
    inputClass: "toggle",
    inputType: "checkbox",
    descriptionClass: "description",
    descriptionText: "Editing task",
    createdClass: "created",
    createdText: "created 5 minutes ago",
    iconClass: "icon",
    buttonEditClass: "icon-edit",
    buttonDestroyClass: "icon-destroy",
    input2Class: "edit",
    input2Type: "text",
    input2defaultValue: "Editing task"
  },

  {
    containerClass: "view",
    inputClass: "toggle",
    inputType: "checkbox",
    descriptionClass: "description",
    descriptionText: "Active task",
    createdClass: "created",
    createdText: "created 5 minutes ago",
    iconClass: "icon",
    buttonEditClass: "icon-edit",
    buttonDestroyClass: "icon-destroy",
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
