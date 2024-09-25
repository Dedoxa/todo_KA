import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import Footer from "./components/Footer/Footer";
import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import TaskList from "./components/TaskList/TaskList";

import "./App.css";

export default class App extends React.Component {

  static defaultProps = {}
  static propTypes = {}
  
  startId = 0;

  state = {
    tasks: [
      this.createItem("Task №1"),
      this.createItem("Task №2"),
      this.createItem("Task №3"),
    ],
  };

  createItem(descriptionText) {
    return {
      descriptionText,
      dateOfCreation: new Date(),
      // timePassedFromCreation: formatDistanceToNow(this.dateOfCreation),
      // createdText: `created ${this.timePassedFromCreation} ago`,
      createdText: `created ${this.dateOfCreation} ago`,
      done: false,
      hidden: false,
      id: this.startId++,
    };
  }

  addItem = (text) => {
    const newItem = this.createItem(text);

    this.setState(({ tasks }) => {
      const newArray = [...tasks, newItem];
      return {
        tasks: newArray,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const newArray = tasks.toSpliced(idx, 1);
      return {
        tasks: newArray,
      };
    });
  };

  filterTasks(arr, propName, value) {
    return arr.filter((el) => el[propName] === value);
  }

  deleteDoneItems = () => {
    this.setState(({ tasks }) => {
      const newArray = this.filterTasks(tasks, "done", false);
      return {
        tasks: newArray,
      };
    });
  };

  switchProp(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return arr.toSpliced(idx, 1, newItem);
  }

  onTaskClick = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.switchProp(tasks, id, "done"),
      };
    });
  };

  showAllTasks = () => {
    this.setState(({ tasks }) => {
      const newArray = JSON.parse(JSON.stringify(tasks));
      newArray.forEach((el) => (el.hidden = false));
      return {
        tasks: newArray,
      };
    });
  };

  showCompletedTasks = () => {
    this.setState(({ tasks }) => {
      const newArray = JSON.parse(JSON.stringify(tasks));
      newArray.forEach((el) => {
        if (el.done === true) el.hidden = true;
        if (el.done === false) el.hidden = false;
      });
      return {
        tasks: newArray,
      };
    });
  };

  showActiveTasks = () => {
    this.setState(({ tasks }) => {
      const newArray = JSON.parse(JSON.stringify(tasks));
      newArray.forEach((el) => {
        if (el.done === false) el.hidden = true;
        if (el.done === true) el.hidden = false;
      });
      return {
        tasks: newArray,
      };
    });
  };

  render() {
    const { tasks } = this.state;
    const doneCount = tasks.filter((el) => el.done).length;
    const tasksCount = tasks.length - doneCount;

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
          />
          <Footer
            data={tasks}
            tasksSumm={tasksCount}
            onClearCompleted={this.deleteDoneItems}
            onShowAll={this.showAllTasks}
            onShowCompleted={this.showCompletedTasks}
            onShowActive={this.showActiveTasks}
          />
        </section>
      </section>
    );
  }
}
