import React, { useState, useEffect } from 'react'

import Footer from './components/Footer/Footer.js'
import NewTaskForm from './components/NewTaskForm/NewTaskForm.js'
import TaskList from './components/TaskList/TaskList.js'

import './App.css'

const App = () => {
  const [footerFilter, setFooterFilter] = useState('All')
  const [tasks, setTasks] = useState([])
  localStorage.setItem('tasks', JSON.stringify(tasks))

  let startId = tasks.length > 0 ? tasks.reduce((max, task) => Math.max(max, task.id), -1) : 0

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'))
    if (savedTasks && savedTasks.length > 0) {
      const tasks = savedTasks.map((task) => ({ ...task, edit: false }))
      const maxId = tasks.reduce((max, task) => Math.max(max, task.id), -1)
      startId = maxId + 1
      setTasks(tasks)
    }
  }, [])

  const createItem = (descriptionText, minutes = 0, seconds = 0) => {
    return {
      descriptionText,
      dateOfCreation: new Date(),
      minutes,
      seconds,
      edit: false,
      done: false,
      hidden: false,
      id: startId + 1,
    }
  }

  const addItem = (text, minutes, seconds) => {
    const newItem = createItem(text, minutes, seconds)
    const newArray = [...tasks, newItem]
    localStorage.setItem('tasks', JSON.stringify(newArray))
    setTasks(newArray)
  }

  const onDeleted = (id) => {
    const idx = tasks.findIndex((el) => el.id === id)
    const newArray = tasks.toSpliced(idx, 1)
    localStorage.setItem('tasks', JSON.stringify(newArray))
    setTasks(newArray)
  }

  const filterTasks = (arr, propName, value) => {
    return arr.filter((el) => el[propName] === value)
  }

  const onClearCompleted = () => {
    const newArray = filterTasks(tasks, 'done', false)
    setTasks(newArray)
  }

  const switchProp = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return arr.toSpliced(idx, 1, newItem)
  }

  const onToggleDone = (id) => {
    localStorage.setItem('tasks', JSON.stringify(switchProp(tasks, id, 'done')))
    setTasks(switchProp(tasks, id, 'done'))
  }

  const onEdit = (id) => {
    setTasks(switchProp(tasks, id, 'edit'))
  }

  const onRewrite = (text, id) => {
    const idx = tasks.findIndex((el) => el.id === id)
    const oldItem = tasks[idx]
    const newItem = { ...oldItem, descriptionText: text }
    const newArray = tasks.toSpliced(idx, 1, newItem)
    localStorage.setItem('tasks', JSON.stringify(newArray))
    setTasks(switchProp(newArray, id, 'edit'))
  }

  const onShowAll = () => {
    const newFooterFilter = 'All'
    const newArray = JSON.parse(JSON.stringify(tasks))
    newArray.forEach((el) => (el.hidden = false))
    setTasks(newArray)
    setFooterFilter(newFooterFilter)
  }

  const onShowCompleted = () => {
    const newFooterFilter = 'Completed'
    const newArray = JSON.parse(JSON.stringify(tasks))
    newArray.forEach((el) => {
      if (el.done === true) el.hidden = true
      if (el.done === false) el.hidden = false
    })
    setTasks(newArray)
    setFooterFilter(newFooterFilter)
  }

  const onShowActive = () => {
    const newFooterFilter = 'Active'
    const newArray = JSON.parse(JSON.stringify(tasks))
    newArray.forEach((el) => {
      if (el.done === false) el.hidden = true
      if (el.done === true) el.hidden = false
    })
    setTasks(newArray)
    setFooterFilter(newFooterFilter)
  }

  //----------------

  const doneCount = tasks.filter((el) => el.done).length
  const tasksCount = tasks.length - doneCount

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          dataTasks={tasks}
          onDeleted={onDeleted}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          onRewrite={onRewrite}
        />
        <Footer
          tasksSumm={tasksCount}
          onClearCompleted={onClearCompleted}
          footerFilter={footerFilter}
          onShowAll={onShowAll}
          onShowCompleted={onShowCompleted}
          onShowActive={onShowActive}
        />
      </section>
    </section>
  )
}

export default App
