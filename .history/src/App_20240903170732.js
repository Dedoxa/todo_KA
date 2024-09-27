import React from 'react'

import tasks from '../Data/Data'

import Footer from './components/Footer/Footer'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'

import './App.css'

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
