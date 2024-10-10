import React from 'react'

import Footer from './components/Footer/Footer.js'
import NewTaskForm from './components/NewTaskForm/NewTaskForm.js'
import TaskList from './components/TaskList/TaskList.js'

import './App.css'

export default class App extends React.Component {
  static defaultProps = {}
  static propTypes = {}

  state = {
    footerFilter: 'All',
    tasks: [],
  }

  startId = (() => {
    if (this.state.tasks.length > 0) {
      console.log(`here are ${this.state.tasks.length} tasks`)
      return this.state.tasks.length
    }
    console.log('here are no tasks')
    return 0
  })()

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

  deleteItem = (id) => {
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

  deleteDoneItems = () => {
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

  onTaskClick = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.switchProp(tasks, id, 'done'),
      }
    })
  }

  onEditClick = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.switchProp(tasks, id, 'edit'),
      }
    })
  }

  changeTaskText = (text, id) => {
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

  showAllTasks = () => {
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

  showCompletedTasks = () => {
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

  showActiveTasks = () => {
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

  componentDidMount() {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      this.setState({
        tasks: JSON.parse(savedTasks),
      })
    }
  }

  render() {
    const { tasks } = this.state
    const { footerFilter } = this.state
    const doneCount = tasks.filter((el) => el.done).length
    const tasksCount = tasks.length - doneCount

    // if (tasks.length < 1) {
    //   this.addItem('tt')
    // }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            data={tasks}
            onDeleted={this.deleteItem}
            onToggleDone={this.onTaskClick}
            onEdit={this.onEditClick}
            onRewrite={this.changeTaskText}
          />
          <Footer
            tasksSumm={tasksCount}
            onClearCompleted={this.deleteDoneItems}
            footerFilter={footerFilter}
            onShowAll={this.showAllTasks}
            onShowCompleted={this.showCompletedTasks}
            onShowActive={this.showActiveTasks}
          />
        </section>
      </section>
    )
  }
}
