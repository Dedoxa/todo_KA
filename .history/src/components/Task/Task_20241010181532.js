import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.css'

export default class Task extends React.Component {
  static defaultProps = {
    id: -1,
    descriptionText: 'defaultText',
    dateOfCreation: 'defaultDate',
    onDeleted: () => {
      alert('Task.defaultFunction')
    },
    edit: false,
    done: false,
    hidden: false,
    onToggleDone: () => {
      alert('Task.defaultFunction')
    },
    onEdit: () => {
      alert('Task.defaultFunction')
    },
    onRewrite: () => {
      alert('Task.defaultFunction')
    },
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    descriptionText: PropTypes.string.isRequired,
    dateOfCreation: PropTypes.any.isRequired,
    onDeleted: PropTypes.func.isRequired,
    edit: PropTypes.bool,
    done: PropTypes.bool,
    hidden: PropTypes.bool,
    onToggleDone: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRewrite: PropTypes.func,
  }

  state = {
    descriptionText: this.props.descriptionText,
    timeFromCreation: formatDistanceToNow(this.props.dateOfCreation, {
      includeSeconds: true,
    }),
    isRunning: false,
    timerInterval: null,
    isCountingUp: !this.props.minutes && !this.props.seconds,
    time: {
      minutes: this.props.timerValue.minutes,
      seconds: this.props.timerValue.seconds,
    },
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        timeFromCreation: formatDistanceToNow(this.props.dateOfCreation, {
          includeSeconds: true,
        }),
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onInputChange = (e) => {
    this.setState({
      descriptionText: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.descriptionText.trim() !== '') {
      this.props.onRewrite(this.state.descriptionText, this.props.id)
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        const { minutes, seconds } = prevState.time
        let newMinutes = minutes
        let newSeconds = seconds

        if (newSeconds === 0) {
          if (newMinutes === 0) {
            clearInterval(this.interval)
            return { time: { minutes: 0, seconds: 0 } }
          }
          newMinutes -= 1
          newSeconds = 59
        } else {
          newSeconds -= 1
        }

        const newTime = { minutes: newMinutes, seconds: newSeconds }
        const updatedTasks = this.props.data.map((task) =>
          task.id === this.props.id ? { ...task, timerValue: newTime } : task
        )
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))

        return { time: newTime }
      })
    }, 1000)
  }

  onPlayClick = () => {
    this.startTimer()
  }

  pauseTimer = () => {
    if (this.state.isRunning) {
      clearInterval(this.interval)
      this.setState({ isRunning: false })
    }
  }

  onPauseClick = () => {
    this.pauseTimer()
  }

  render() {
    const { id, descriptionText, onDeleted, edit, done, hidden, onToggleDone, onEdit } = this.props

    let liClassNames = ''
    let divClasses = 'view'
    let editFormClasses = ''
    let checkBoxState = ''

    edit ? (liClassNames = 'editing') : (liClassNames = '')

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
      <li key={id} className={liClassNames}>
        <div className={divClasses}>
          <input className="toggle" type="checkbox" onClick={onToggleDone} checked={checkBoxState} readOnly />
          <label>
            <span className="description" onClick={onToggleDone}>
              {descriptionText}
            </span>
            <span className="timerSection">
              <button className="icon icon-play" onClick={this.onPlayClick}></button>
              <button className="icon icon-pause" onClick={this.onPauseClick}></button>
              <span className="time">{`${this.state.time.minutes}:${this.state.time.seconds.toString().padStart(2, '0')}`}</span>
            </span>
            <span className="created">{`created ${this.state.timeFromCreation} ago`}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit} className={editFormClasses}>
          <input type="text" className="edit" value={this.state.descriptionText} onChange={this.onInputChange}></input>
        </form>
      </li>
    )
  }
}
