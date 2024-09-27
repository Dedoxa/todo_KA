import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

export default class TasksFilter extends React.Component {
  static defaultProps = {
    footerFiler: 'default',
    onShowAll: () => {
      alert('Footer.TasksFilter.defaultfunction')
    },
    onShowCompleted: () => {
      alert('Footer.TasksFilter.defaultfunction')
    },
    onShowActive: () => {
      alert('Footer.TasksFilter.defaultfunction')
    },
  };

  static propTypes = {
    footerFiler: PropTypes.string,
    onShowAll: PropTypes.func,
    onShowCompleted: PropTypes.func,
    onShowActive: PropTypes.func,
  };

  render() {
    const { footerFiler, onShowAll, onShowCompleted, onShowActive } = this.props

    let allClassNames = ''
    let completedClassNames = ''
    let activeClassNames = ''

    switch (footerFiler) {
    case 'All':
      allClassNames = 'selected'
      completedClassNames = ''
      activeClassNames = ''
      break
    case 'Completed':
      allClassNames = ''
      completedClassNames = 'selected'
      activeClassNames = ''
      break
    case 'Active':
      allClassNames = ''
      completedClassNames = ''
      activeClassNames = 'selected'
      break
    default:
      allClassNames = ''
      completedClassNames = ''
      activeClassNames = ''
      break
    }

    return (
      <ul className="filters">
        <li>
          <button onClick={() => onShowAll()} className={allClassNames}>
            All
          </button>
        </li>
        <li>
          <button onClick={() => onShowCompleted()} className={completedClassNames}>
            Active
          </button>
        </li>
        <li>
          <button onClick={() => onShowActive()} className={activeClassNames}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
