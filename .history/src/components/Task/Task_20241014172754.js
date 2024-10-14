import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

const Task = ({
  id,
  descriptionText,
  dateOfCreation,
  minutes,
  seconds,
  onDeleted,
  edit,
  done,
  hidden,
  onEdit,
  onRewrite,
  onToggleDone,
}) => {
  const [overviewText, setOverviewText] = useState(descriptionText)
  const [timeFromCreation, setTimeFromCreation] = useState(
    formatDistanceToNow(dateOfCreation, {
      includeSeconds: true,
    })
  )
  const [isRunning, setIsRunning] = useState(false)
  const [hasStopped, setHasStopped] = useState(false)
  const [timerInterval, setTimerInterval] = useState(null)
  const [isCountingUp] = useState(!minutes && !seconds)
  const [time, setTime] = useState(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)

  const taskRef = useRef(null)

  useEffect(() => {
    const savedTime = localStorage.getItem(`task-${id}-time`)
    if (savedTime) {
      setTime(savedTime)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClickOutside)

    setTimerInterval(
      setInterval(() => {
        setTimeFromCreation(
          formatDistanceToNow(dateOfCreation, {
            includeSeconds: true,
          })
        )
      }, 1000)
    )

    return () => {
      localStorage.removeItem(`task-${id}-time`, time)
      clearInterval(timerInterval)

      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const getPreviousDescriptionText = () => {
    const parsedStorage = JSON.parse(localStorage.getItem('tasks'))
    const prevDescriptionText = parsedStorage[id - 1].descriptionText
    setOverviewText(prevDescriptionText)
  }

  const handleKeyDown = (e) => {
    console.log('эскейпишь')
    if (e.key === 'Escape' && edit) {
      getPreviousDescriptionText()
      onEdit()
    }
  }

  const handleClickOutside = (e) => {
    console.log('кликаутсайдишь', this.node)
    if (edit && taskRef.current && !taskRef.current.contains(e.target)) {
      getPreviousDescriptionText()
      onEdit()
    }
  }

  const onInputChange = (e) => {
    setOverviewText(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (overviewText.trim() !== '') {
      onRewrite(overviewText, id)
    }
  }

  const startTimer = () => {
    if (!isRunning && !hasStopped) {
      setIsRunning(true)
      const [minutes, seconds] = time.split(':').map(Number)
      let totalSeconds = minutes * 60 + seconds

      setTimerInterval(
        setInterval(() => {
          if (isCountingUp) {
            totalSeconds += 1
          } else {
            totalSeconds -= 1
          }

          const min = Math.floor(totalSeconds / 60)
          const sec = totalSeconds % 60

          if (totalSeconds >= 0 || isCountingUp) {
            setTime(`${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`)
            localStorage.setItem(`task-${id}-time`, time)
          } else {
            clearInterval(timerInterval)
            setIsRunning(false)
          }
        }, 1000)
      )
    }
  }

  const resetTimer = () => {
    clearInterval(timerInterval)
    const newTime = '00:00'

    setTime(newTime)
    setIsRunning(false)
    setHasStopped(true)
    localStorage.setItem(`task-${id}-time`, newTime)
  }

  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(timerInterval)
      setIsRunning(false)
      localStorage.setItem(`task-${id}-time`, time)
    }
  }

  const onToggleDoneAndStopTimer = (e) => {
    e.stopPropagation()
    resetTimer()
    onToggleDone(id)
  }

  const pureOnEdit = (e) => {
    e.stopPropagation()
    onEdit()
  }

  let divClasses = 'view'
  let editFormClasses = ''
  let checkBoxState = ''

  if (done) {
    divClasses += ' completed'
    checkBoxState = true
  } else {
    divClasses.replace(' completed', '')
    checkBoxState = false
  }

  if (hidden) {
    divClasses += ' hidden'
    editFormClasses += ' hidden'
  } else {
    divClasses.replace(' hidden', '')
    editFormClasses.replace(' hidden', '')
  }

  return (
    <li key={id} className={edit ? 'editing' : ''}>
      <div className={divClasses}>
        <input className="toggle" type="checkbox" onClick={onToggleDoneAndStopTimer} checked={checkBoxState} readOnly />
        <label>
          <span className="description" onClick={onToggleDoneAndStopTimer}>
            {descriptionText}
          </span>
          <span className="timerSection">
            <button className="icon icon-play" onClick={startTimer}></button>
            <button className="icon icon-pause" onClick={pauseTimer}></button>
            <span className="time">{time}</span>
          </span>
          <span className="created">{`created ${timeFromCreation} ago`}</span>
        </label>
        <button className="icon icon-edit" onClick={pureOnEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={onSubmit} className={editFormClasses}>
        <input type="text" className="edit" value={overviewText} onChange={onInputChange}></input>
      </form>
    </li>
  )
}

export default Task
