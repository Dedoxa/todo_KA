import React, { useState } from 'react'

import Footer from './components/Footer/Footer.js'
import NewTaskForm from './components/NewTaskForm/NewTaskForm.js'
import TaskList from './components/TaskList/TaskList.js'

import './App.css'

const App = () => {
  const defaultProps = {}
  const propTypes = {}

  startId = 0

  useState(() => {}, [])

  state = {
    footerFilter: 'All',
    tasks: [],
  }

  createItem(descriptionText, minutes = 0, seconds = 0) {
    return {
      descriptionText,
      dateOfCreation: new Date(),
      minutes,
      seconds,
      edit: false,
      done: false,
      hidden: false,
      id: this.startId++,
    }
  }

  addItem = (text, minutes, seconds) => {
    const newItem = this.createItem(text, minutes, seconds)

    this.setState(({ tasks }) => {
      const newArray = [...tasks, newItem]
      localStorage.setItem('tasks', JSON.stringify(newArray))
      return {
        tasks: newArray,
      }
    })
  }

  onDeleted = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const newArray = tasks.toSpliced(idx, 1)
      localStorage.setItem('tasks', JSON.stringify(newArray))
      return {
        tasks: newArray,
      }
    })
  }

  filterTasks(arr, propName, value) {
    return arr.filter((el) => el[propName] === value)
  }

  onClearCompleted = () => {
    this.setState(({ tasks }) => {
      const newArray = this.filterTasks(tasks, 'done', false)
      return {
        tasks: newArray,
      }
    })
  }

  switchProp(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return arr.toSpliced(idx, 1, newItem)
  }

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      localStorage.setItem('tasks', JSON.stringify(this.switchProp(tasks, id, 'done')))
      return {
        tasks: this.switchProp(tasks, id, 'done'),
      }
    })
  }

  onEdit = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.switchProp(tasks, id, 'edit'),
      }
    })
  }

  onRewrite = (text, id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldItem = tasks[idx]
      const newItem = { ...oldItem, descriptionText: text }
      const newArray = tasks.toSpliced(idx, 1, newItem)
      localStorage.setItem('tasks', JSON.stringify(newArray))
      return {
        tasks: this.switchProp(newArray, id, 'edit'),
      }
    })
  }

  onShowAll = () => {
    this.setState(({ tasks }) => {
      const newFooterFilter = 'All'
      const newArray = JSON.parse(JSON.stringify(tasks))
      newArray.forEach((el) => (el.hidden = false))
      return {
        footerFilter: newFooterFilter,
        tasks: newArray,
      }
    })
  }

  onShowCompleted = () => {
    this.setState(({ tasks }) => {
      const newFooterFilter = 'Completed'
      const newArray = JSON.parse(JSON.stringify(tasks))
      newArray.forEach((el) => {
        if (el.done === true) el.hidden = true
        if (el.done === false) el.hidden = false
      })
      return {
        footerFilter: newFooterFilter,
        tasks: newArray,
      }
    })
  }

  onShowActive = () => {
    this.setState(({ tasks }) => {
      const newFooterFilter = 'Active'
      const newArray = JSON.parse(JSON.stringify(tasks))
      newArray.forEach((el) => {
        if (el.done === false) el.hidden = true
        if (el.done === true) el.hidden = false
      })
      return {
        footerFilter: newFooterFilter,
        tasks: newArray,
      }
    })
  }

  render() {
    const { tasks } = this.state
    const { footerFilter } = this.state
    const doneCount = tasks.filter((el) => el.done).length
    const tasksCount = tasks.length - doneCount

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            dataTasks={tasks}
            onDeleted={this.onDeleted}
            onToggleDone={this.onToggleDone}
            onEdit={this.onEdit}
            onRewrite={this.onRewrite}
          />
          <Footer
            tasksSumm={tasksCount}
            onClearCompleted={this.onClearCompleted}
            footerFilter={footerFilter}
            onShowAll={this.onShowAll}
            onShowCompleted={this.onShowCompleted}
            onShowActive={this.onShowActive}
          />
        </section>
      </section>
    )
  }
}

export default App