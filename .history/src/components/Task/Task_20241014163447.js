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
}) => {
  //overviewText вместо descriptionText, setState

  const [overviewText, setOverviewText] = useState(descriptionText)
  const [timeFromCreation, setTimeFromCreation] = useState(
    formatDistanceToNow(dateOfCreation, {
      includeSeconds: true,
    })
  )
  const [isRunning, setIsRunning] = useState(false)
  const [hasStopped, setHasStopped] = useState(false)
  const [timerInterval] = useState(null)
  const [isCountingUp] = useState(!minutes && !seconds)
  const [time, setTime] = useState(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)

  useEffect(() => {
    const savedTime = localStorage.getItem(`task-${id}-time`)
    if (savedTime) {
      setTime(savedTime)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClickOutside)

    const interval = setInterval(() => {
      setTimeFromCreation(
        formatDistanceToNow(dateOfCreation, {
          includeSeconds: true,
        })
      )
    }, 1000)

    return () => {
      localStorage.removeItem(`task-${id}-time`, time)
      clearInterval(interval)

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
    if (e.key === 'Escape' && edit) {
      getPreviousDescriptionText()
      onEdit()
    }
  }

  //-----------!THIS.!NODE???--------------

  const handleClickOutside = (e) => {
    if (edit && !this.node.contains(e.target)) {
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

  //-------------------------

  const startTimer = () => {
    if (!isRunning && !hasStopped) {
      setIsRunning(true)
      const [minutes, seconds] = time.split(':').map(Number)
      let totalSeconds = minutes * 60 + seconds

      interval = setInterval(() => {
        if (isCountingUp) {
          totalSeconds += 1
        } else {
          totalSeconds -= 1
        }

        const min = Math.floor(totalSeconds / 60)
        const sec = totalSeconds % 60

        if (totalSeconds >= 0 || isCountingUp) {
          setState(
            {
              time: `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`,
            },
            () => {
              localStorage.setItem(`task-${id}-time`, state.time)
            }
          )
        } else {
          clearInterval(interval)
          setState({ isRunning: false })
        }
      }, 1000)
    }
  }

  const resetTimer = () => {
    clearInterval(interval)
    const newTime = '00:00'

    setState(
      {
        time: newTime,
        isRunning: false,
        hasStopped: true,
      },
      () => {
        localStorage.setItem(`task-${id}-time`, newTime)
      }
    )
  }

  const onPlayClick = () => {
    if (state.time === '00:00') {
      startTimer()
    } else {
      startTimer()
    }
  }

  const pauseTimer = () => {
    if (state.isRunning) {
      clearInterval(interval)
      setState({ isRunning: false })
      localStorage.setItem(`task-${id}-time`, state.time)
    }
  }

  const onPauseClick = () => {
    pauseTimer()
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
    <li key={id} className={edit ? 'editing' : ''} ref={(node) => (node = node)}>
      <div className={divClasses}>
        <input className="toggle" type="checkbox" onClick={onToggleDoneAndStopTimer} checked={checkBoxState} readOnly />
        <label>
          <span className="description" onClick={onToggleDoneAndStopTimer}>
            {descriptionText}
          </span>
          <span className="timerSection">
            <button className="icon icon-play" onClick={onPlayClick}></button>
            <button className="icon icon-pause" onClick={onPauseClick}></button>
            <span className="time">{time}</span>
          </span>
          <span className="created">{`created ${timeFromCreation} ago`}</span>
        </label>
        <button className="icon icon-edit" onClick={pureOnEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={onSubmit} className={editFormClasses}>
        <input type="text" className="edit" value={descriptionText} onChange={onInputChange}></input>
      </form>
    </li>
  )
}

export default Task
