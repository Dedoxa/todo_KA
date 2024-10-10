
changeTaskText = (text, id, newTime) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldItem = tasks[idx];
      const newItem = { ...oldItem, descriptionText: text, time: newTime }; // Обновляем время
      const newArray = tasks.toSpliced(idx, 1, newItem);
      localStorage.setItem('tasks', JSON.stringify(newArray)); // Обновляем localStorage
      return {
        tasks: this.switchProp(newArray, id, 'edit'),
      };
    });
  }
  