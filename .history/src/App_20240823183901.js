import React from "react";
import Footer from './components/Footer/Footer';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import Task from './components/Task/Task';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';

import "./App.css";

const App = () => {
  return (
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          autofocus
        />
      </header>
      <section class="main">
        <ul class="todo-list">
          <li class="completed">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>
                <span class="description">Completed task</span>
                <span class="created">created 17 seconds ago</span>
              </label>
              <button class="icon icon-edit"></button>
              <button class="icon icon-destroy"></button>
            </div>
          </li>
          <li class="editing">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>
                <span class="description">Editing task</span>
                <span class="created">created 5 minutes ago</span>
              </label>
              <button class="icon icon-edit"></button>
              <button class="icon icon-destroy"></button>
            </div>
            <input type="text" class="edit" value="Editing task" />
          </li>
          <li>
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>
                <span class="description">Active task</span>
                <span class="created">created 5 minutes ago</span>
              </label>
              <button class="icon icon-edit"></button>
              <button class="icon icon-destroy"></button>
            </div>
          </li>
        </ul>
        <footer class="footer">
          <span class="todo-count">1 items left</span>
          <ul class="filters">
            <li>
              <button class="selected">All</button>
            </li>
            <li>
              <button>Active</button>
            </li>
            <li>
              <button>Completed</button>
            </li>
          </ul>
          <button class="clear-completed">Clear completed</button>
        </footer>
      </section>
    </section>
  );
};

export default App;
