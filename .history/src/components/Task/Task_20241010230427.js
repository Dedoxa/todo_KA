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
    time: `${String(this.props.minutes).padStart(2, '0')}:${String(this.props.seconds).padStart(2, '0')}`,
    isRunning: false,
    hasStopped: false,
    timerInterval: null,
    isCountingUp: !this.props.minutes && !this.props.seconds,
  }

  componentDidMount() {
    const savedTime = localStorage.getItem(`task-${this.props.id}-time`)
    if (savedTime) {
      this.setState({ time: savedTime })
    }
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('click', this.handleClickOutside)

    this.interval = setInterval(() => {
      this.setState({
        timeFromCreation: formatDistanceToNow(this.props.dateOfCreation, {
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

  handleKeyDown = (e) => {
    if (e.key === 'Escape' && this.props.edit) {
      this.props.onEdit()
      // e.target.value = JSON.parse(localStorage.getItem('tasks'))
      console.log(JSON.parse(localStorage.getItem('tasks'))[this.props.id])
    }
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

  render() {
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
            <span className="created">{`created ${this.state.timeFromCreation} ago`}</span>
          </label>
          <button className="icon icon-edit" onClick={this.pureOnEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit} className={editFormClasses}>
          <input type="text" className="edit" value={this.state.descriptionText} onChange={this.onInputChange}></input>
        </form>
      </li>
    )
  }
}
