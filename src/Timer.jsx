import React, {Component} from 'react';
import './timer.css'

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeDisplay: 15
    };
    this.questionNumber = 0;
  }

  componentDidMount() {
    const timeOut = setInterval(function () {
      this.setState(() => ({timeDisplay: this.state.timeDisplay - 1}));
      if (this.state.timeDisplay === 1) {
        this.props.showRightAnswer();
      }
      if (this.state.timeDisplay === 0) {
        if (this.questionNumber >= this.props.totalQuestions - 1) {
          this.props.getRankings();
          clearTimeout(timeOut);
        } else {
          this.props.setNextQuestion();
          this.setState(() => ({timeDisplay: 15}));
          this.questionNumber++;
        }
      }
    }.bind(this), 1000);
  }

  render() {
    return (
      <div className={`timer-container`}>
        <div className="spinner spinner-1">
          <span>{this.state.timeDisplay}</span>
        </div>
      </div>
    );
  }
}

export default Timer;
