import React from 'react'

import Footer from './components/Footer/Footer'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'

import './App.css'

export default class App extends React.Component {
  state = {
    tasks: [
      {
        id: 1,
        liClass: '',
        descriptionText: 'Completed task',
        createdText: 'created 17 seconds ago',
      },

      {
        id: 2,
        liClass: 'editing',
        descriptionText: 'Editing task',
        createdText: 'created 5 minutes ago',
        inputClass: 'edit',
        inputType: 'text',
        inputDefaultValue: 'Editing task',
      },

      {
        id: 3,
        descriptionText: 'Active task',
        createdText: 'created 5 minutes ago',
      },
    ],
  };

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
