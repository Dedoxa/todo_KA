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

    if (footerFiler === 'All') {
      allClassNames = 'selected'
      completedClassNames = ''
      activeClassNames = ''
    }

    // switch (footerFiler) {
    //   case "All":
    //     allClassNames = "selected";
    //     completedClassNames = "";
    //     activeClassNames = "";
    //     break;
    //   case "Completed":
    //     allClassNames = "selected";
    //     completedClassNames = "";
    //     activeClassNames = "";
    //     break;
    //   case "Active":
    //     allClassNames = "selected";
    //     completedClassNames = "";
    //     activeClassNames = "";
    //     break;
    // }

    return (
      <ul className="filters">
        <li>
          <button onClick={() => onShowAll()} className="selected">
            All
          </button>
        </li>
        <li>
          <button onClick={() => onShowCompleted()} className="selected">
            Active
          </button>
        </li>
        <li>
          <button onClick={() => onShowActive()} className="selected">
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
