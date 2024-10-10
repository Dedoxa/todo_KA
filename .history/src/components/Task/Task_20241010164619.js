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
    timerInterval: null,
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

  startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true })
      const [minutes, seconds] = this.state.time.split(':').map(Number)

      let totalSeconds = minutes * 60 + seconds

      this.interval = setInterval(() => {
        totalSeconds -= 1

        const min = Math.floor(totalSeconds / 60)
        const sec = totalSeconds % 60

        if (totalSeconds >= 0) {
          this.setState({
            time: `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`, // Обновляем отображаемое время
          })
        } else {
          clearInterval(this.interval) // Останавливаем таймер, когда он достигает 00:00
          this.setState({ isRunning: false })
        }
      }, 1000)
    }
  }

  pauseTimer = () => {
    if (this.state.isRunning) {
      clearInterval(this.interval);
      this.setState({ isRunning: false });
    }
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
              <button className="icon icon-play" onClick={this.startTimer}></button>
              <button className="icon icon-pause" onClick={this.pauseTimer}></button>
              <span className="time">{this.state.time}</span>
            </span>
            <span className="created">{`created ${this.state.timeFromCreation} ago`}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit} className={editFormClasses}>
          <input
            type="text"
            className="edit"
            value={this.state.descriptionText}
            onChange={this.onInputChange}
            onBlur={() => {
              console.log('LOG')
            }}
          ></input>
        </form>
      </li>
    )
  }
}
