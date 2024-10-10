startTimer = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      const [minutes, seconds] = this.state.time.split(':').map(Number);
      let totalSeconds = minutes * 60 + seconds;
  
      this.interval = setInterval(() => {
        if (this.state.isCountingUp) {
          totalSeconds += 1;
        } else {
          totalSeconds -= 1;
        }
  
        const min = Math.floor(totalSeconds / 60);
        const sec = totalSeconds % 60;
  
        if (totalSeconds >= 0 || this.state.isCountingUp) {
          this.setState({
            time: `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`,
          }, () => {
            localStorage.setItem(`task-${this.props.id}-time`, this.state.time); // Сохраняем текущее время
          });
        } else {
          clearInterval(this.interval);
          this.setState({ isRunning: false });
        }
      }, 1000);
    }
  }