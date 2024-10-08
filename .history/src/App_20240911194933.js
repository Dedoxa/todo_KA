import React from 'react'

import Footer from './components/Footer/Footer'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'

import './App.css'

export default class App extends React.Component {
  startId = 0;

  state = {
    tasks: [this.createTask('Some task 1'), this.createTask('Some task 2'), this.createTask('Some task 3')],
  };

  createTask(text) {
    return {
      text,
      id: this.maxId++,
    }
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const newArray = tasks.toSpliced(idx, 1)
      return {
        tasks: newArray,
      }
    })
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList data={this.state.tasks} onDeleted={this.deleteItem} />
          <Footer />
        </section>
      </section>
    )
  }
}
