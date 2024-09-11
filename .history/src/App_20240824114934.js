import React from "react";
import Footer from './components/Footer/Footer';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';

import "./App.css";

const tasks = [
  {
    liClass: "completed",
    containerClass: "view",
    descriptionText: "Completed task",
    createdText: "created 17 seconds ago",
  },

  {
    liClass: "completed",
    containerClass: "view",
    descriptionText: "Completed task",
    createdText: "created 17 seconds ago",
  },

  {
    liClass: "editing",
    containerClass: "view",
    descriptionText: "Editing task",
    createdText: "created 5 minutes ago",
    input2Class: "edit",
    input2Type: "text",
    input2defaultValue: "Editing task"
  },

  {
    containerClass: "view",
    descriptionText: "Active task",
    createdText: "created 5 minutes ago",
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
