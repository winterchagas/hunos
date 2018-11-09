import React, {Component} from 'react';
import questions from './data/questions';
import Question from './Question';
import Answers from './Answers';
import Bar from './Bar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      activeChoice: ''
    };
    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.pickAnswer = this.pickAnswer.bind(this);
  }

  setNextQuestion() {
    this.setState(() => ({currentQuestionIndex: this.state.currentQuestionIndex + 1}));
  }

  pickAnswer(activeChoice) {
    this.setState(() => ({activeChoice}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Question
            question={questions[this.state.currentQuestionIndex].question}
          />
          <Bar
            activeChoice={this.state.activeChoice}
            number={{a: 10, b: 15, c: 0, d: 5}}
          />
          <Answers
            activeChoice={this.state.activeChoice}
            pickAnswer={this.pickAnswer}
            answers={questions[this.state.currentQuestionIndex].answers}
          />
          <div onClick={this.setNextQuestion}>NEXT QUESTION</div>
        </header>
      </div>
    );
  }
}

export default App;
