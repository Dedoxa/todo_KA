import React from 'react'

import Footer from './components/Footer/Footer'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'

import './App.css'

const tasks = [
  {
    id: 1,
    liClass: 'completed',
    descriptionText: 'Completed task',
    createdText: 'created 17 seconds ago',
  },

  {
    id: 2,
    liClass: 'edit',
    descriptionText: 'Editing task',
    createdText: 'created 5 minutes ago',
    input2Type: 'text',
    input2defaultValue: 'Editing task',
  },

  {
    id: 3,
    descriptionText: 'Active task',
    createdText: 'created 5 minutes ago',
  },
]

const App = () => {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList data={tasks} />
        <Footer />
      </section>
    </section>
  )
}

export default App
