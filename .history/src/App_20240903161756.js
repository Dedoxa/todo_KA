import React from 'react'

import Footer from './components/Footer/Footer'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Task from './components/Task/Task'

import './App.css'

const tasks = [
  {
    liClass: 'completed',
    descriptionText: 'Completed task',
    createdText: 'created 17 seconds ago',
  },

  {
    liClass: 'completed',
    descriptionText: 'Completed task',
    createdText: 'created 17 seconds ago',
  },

  {
    liClass: 'editing',
    descriptionText: 'Editing task',
    createdText: 'created 5 minutes ago',
    input2Class: 'edit',
    input2Type: 'text',
    input2defaultValue: 'Editing task',
  },

  {
    descriptionText: 'Active task',
    createdText: 'created 5 minutes ago',
  },
]

const App = () => {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <Task />
        <TaskList />
        <Footer />
      </section>
    </section>
  )
}

export default App
