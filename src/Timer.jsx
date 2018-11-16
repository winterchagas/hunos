import React, {Component} from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeDisplay: 10
    };
    this.questionNumber = 0;
  }

  componentDidMount() {
    const timeOut = setInterval(function () {
      this.setState(() => ({timeDisplay: this.state.timeDisplay - 1}));
      if (this.state.timeDisplay === 0) {
        if (this.questionNumber >= this.props.totalQuestions -1) {
          this.props.finishGame();
          clearTimeout(timeOut);
        } else {
          this.props.setNextQuestion();
          this.setState(() => ({timeDisplay: 10}));
          this.questionNumber++;
        }
      }
    }.bind(this), 1000);
  }

  render() {
    return (
      <div className={`timer-container`}>
        <h1>{this.state.timeDisplay}</h1>
      </div>
    );
  }
}

export default Timer;
