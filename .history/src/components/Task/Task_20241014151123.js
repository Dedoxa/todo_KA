import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

const Task = ({ descriptionText, dateOfCreation, minutes, seconds }) => {
  const [descriptionText] = useState(descriptionText)
  const [timeFromCreation] = useState(formatDistanceToNow(dateOfCreation, {
    includeSeconds: true,
  }))
  const [isRunning] = useState(false)
  const [hasStopped] = useState(false)
  const [timerInterval] = useState(null)
  const [isCountingUp] = useState(!minutes && !seconds)
  const [time] = useState(`${String(this.props.minutes).padStart(2, '0')}:${String(this.props.seconds).padStart(2, '0')}`)

  componentDidMount() {
    const savedTime = localStorage.getItem(`task-${this.props.id}-time`)
    if (savedTime) {
      this.setState({ time: savedTime })
    }
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('click', this.handleClickOutside)

    this.interval = setInterval(() => {
      this.setState({
        timeFromCreation: formatDistanceToNow(dateOfCreation, {
          includeSeconds: true,
        }),
      })
    }, 1000)
  }

  componentWillUnmount() {
    localStorage.removeItem(`task-${this.props.id}-time`, this.state.time)
    clearInterval(this.interval)

    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('click', this.handleClickOutside)
  }

  getPreviousDescriptionText = () => {
    const parsedStorage = JSON.parse(localStorage.getItem('tasks'))
    const prevDescriptionText = parsedStorage[this.props.id - 1].descriptionText
    this.setState({
      descriptionText: prevDescriptionText,
    })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Escape' && this.props.edit) {
      this.getPreviousDescriptionText()
      this.props.onEdit()
    }
  }

  handleClickOutside = (e) => {
    if (this.props.edit && !this.node.contains(e.target)) {
      this.getPreviousDescriptionText()
      this.props.onEdit()
    }
  }

  onInputChange = (e) => {
    this.setState({
      descriptionText: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (descriptionText.trim() !== '') {
      this.props.onRewrite(descriptionText, this.props.id)
    }
  }

  startTimer = () => {
    if (!this.state.isRunning && !this.state.hasStopped) {
      this.setState({ isRunning: true })
      const [minutes, seconds] = this.state.time.split(':').map(Number)
      let totalSeconds = minutes * 60 + seconds

      this.interval = setInterval(() => {
        if (this.state.isCountingUp) {
          totalSeconds += 1
        } else {
          totalSeconds -= 1
        }

        const min = Math.floor(totalSeconds / 60)
        const sec = totalSeconds % 60

        if (totalSeconds >= 0 || this.state.isCountingUp) {
          this.setState(
            {
              time: `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`,
            },
            () => {
              localStorage.setItem(`task-${this.props.id}-time`, this.state.time)
            }
          )
        } else {
          clearInterval(this.interval)
          this.setState({ isRunning: false })
        }
      }, 1000)
    }
  }

  resetTimer = () => {
    clearInterval(this.interval)
    const newTime = '00:00'

    this.setState(
      {
        time: newTime,
        isRunning: false,
        hasStopped: true,
      },
      () => {
        localStorage.setItem(`task-${this.props.id}-time`, newTime)
      }
    )
  }

  onPlayClick = () => {
    if (this.state.time === '00:00') {
      this.startTimer()
    } else {
      this.startTimer()
    }
  }

  pauseTimer = () => {
    if (this.state.isRunning) {
      clearInterval(this.interval)
      this.setState({ isRunning: false })
      localStorage.setItem(`task-${this.props.id}-time`, this.state.time)
    }
  }

  onPauseClick = () => {
    this.pauseTimer()
  }

  onToggleDoneAndStopTimer = (e) => {
    e.stopPropagation()
    this.resetTimer()
    this.props.onToggleDone(this.props.id)
  }

  pureOnEdit = (e) => {
    e.stopPropagation()
    this.props.onEdit()
  }

    const { id, descriptionText, onDeleted, edit, done, hidden } = this.props
    const { time } = this.state

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
      <li key={id} className={edit ? 'editing' : ''} ref={(node) => (this.node = node)}>
        <div className={divClasses}>
          <input
            className="toggle"
            type="checkbox"
            onClick={this.onToggleDoneAndStopTimer}
            checked={checkBoxState}
            readOnly
          />
          <label>
            <span className="description" onClick={this.onToggleDoneAndStopTimer}>
              {descriptionText}
            </span>
            <span className="timerSection">
              <button className="icon icon-play" onClick={this.onPlayClick}></button>
              <button className="icon icon-pause" onClick={this.onPauseClick}></button>
              <span className="time">{time}</span>
            </span>
            <span className="created">{`created ${timeFromCreation} ago`}</span>
          </label>
          <button className="icon icon-edit" onClick={this.pureOnEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit} className={editFormClasses}>
          <input type="text" className="edit" value={descriptionText} onChange={this.onInputChange}></input>
        </form>
      </li>
    )
}

export default Task
