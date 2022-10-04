import React from "react";
import ReactDOM from "react-dom";
import "./Pomodoro.css"

class Pomodoro extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        timeLeft: 1500,
        isPaused: true,
        session: 25,
        break: 5,
        label: "session"
      };
    }
  
    handleStart = () => {
      if (this.state.isPaused) {
        this.intervalHandle = setInterval(this.tick, 1000);
        this.setState({
          isPaused: false
        });
      } else {
        clearInterval(this.intervalHandle);
        this.setState({
          isPaused: true
        });
      }
    };
  
    handleReset = () => {
      clearInterval(this.intervalHandle);
      this.aud.pause();
      this.aud.currentTime = 0;
      this.setState({
        timeLeft: 1500,
        isPaused: true,
        session: 25,
        break: 5,
        label: "session"
      });
    };
  
    handleTimeControl = e => {
      clearInterval(this.intervalHandle);
      this.setState({
        isPaused: true,
        label: "session",
        timeLeft: this.state.session * 60
      });
      if (e.target.value === "b-") {
        this.setState({
          break: this.state.break - 1 > 1 ? this.state.break - 1 : 1
        });
      }
      if (e.target.value === "b+") {
        this.setState({
          break: this.state.break + 1 < 60 ? this.state.break + 1 : 60
        });
      }
      if (e.target.value === "s-") {
        this.setState({
          session: this.state.session - 1 > 1 ? this.state.session - 1 : 1,
          timeLeft: (this.state.session - 1 > 1 ? this.state.session - 1 : 1) * 60
        });
      }
      if (e.target.value === "s+") {
        this.setState({
          session: this.state.session + 1 < 60 ? this.state.session + 1 : 60,
          timeLeft:
            (this.state.session + 1 < 60 ? this.state.session + 1 : 60) * 60
        });
      }
    };
  
    tick = () => {
      if (this.state.timeLeft === 0) {
        this.aud.play();
        this.aud.currentTime = 0;
        if (this.state.label === "session") {
          this.setState({
            label: "break",
            timeLeft: this.state.break * 60
          });
        } else {
          this.setState({
            label: "session",
            timeLeft: this.state.session * 60
          });
        }
      } else {
        this.setState({
          timeLeft: this.state.timeLeft - 1
        });
      }
    };
  
    clock = () => {
      let minutes = Math.floor(this.state.timeLeft / 60);
      let seconds = this.state.timeLeft - minutes * 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return minutes + ":" + seconds;
    };
  
    render() {
      return (
        <div>
          <h3 id="session-label">Session Length</h3>
          <button
            id="session-decrement"
            onClick={this.handleTimeControl}
            value="s-"
          >
            -
          </button>
          <span id="session-length">{this.state.session}</span>
          <button
            id="session-increment"
            onClick={this.handleTimeControl}
            value="s+"
          >
            +
          </button>
  
          <h3 id="break-label">Break Length</h3>
          <button
            id="break-decrement"
            onClick={this.handleTimeControl}
            value="b-"
          >
            -
          </button>
          <span id="break-length">{this.state.break}</span>
          <button
            id="break-increment"
            onClick={this.handleTimeControl}
            value="b+"
          >
            +
          </button>
  
          <h2 id="timer-label">{this.state.label}</h2>
          <h2 id="time-left">{this.clock()}</h2>
  
          <button id="start_stop" onClick={this.handleStart}>
            {this.state.isPaused ? "start" : "pause"}
          </button>
  
          <button id="reset" onClick={this.handleReset}>
            Reset
          </button>
  
          <audio
            id="beep"
            ref={input => {
              this.aud = input;
            }}
            src="https://freesound.org/data/previews/467/467317_520316-lq.mp3"
            style={{ display: "none" }}
          />
        </div>
      );
    }
  }
  
  export default Pomodoro;
  
  const rootElement = document.getElementById("root");
ReactDOM.render(<Pomodoro />, rootElement);

// note reactrender in the chrome xonsole is having issues 