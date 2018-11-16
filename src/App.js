import React, {Component} from 'react';
import io from 'socket.io-client';
import questions from './data/questions';
import Question from './Question';
import Answers from './Answers';
import Bar from './Bar';
import LoadPage from './LoadPage';
import HostPage from './HostPage';
import Timer from './Timer';
import Ranking from './Ranking';
import './App.css';

const socket = io();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChoice: '',
      loggedIn: false,
      gameStarted: false,
      gameFinished: false,
      answers: {},
      timeDisplay: 10,
      isHost: false
    };

    this.currentQuestionIndex = 0;
    this.userError = '';

    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.pickAnswer = this.pickAnswer.bind(this);
    this.submitName = this.submitName.bind(this);
    this.changeTimeDisplay = this.changeTimeDisplay.bind(this);
    this.finishGame = this.finishGame.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    socket.on('connect', function () {
      console.log('CLIENT CONNECTED');
    });
    socket.on('newAnswer', (answers) => {
      console.log('NEW ANSWER ARRAY RECEIVED', answers);
      if (answers) {
        this.setState({answers});
      }
    });
    socket.on('gameStarted', () => {
      if (this.state.loggedIn) {
        this.setState(() => ({gameStarted: true}));
      }
    });
  }

  startGame() {
    socket.emit('startGame');
  }

  finishGame() {
    // todo emit event to grab the rankings
    this.setState(() => ({gameFinished: true}));
  }

  setNextQuestion() {
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
    this.setState(() => ({
      activeChoice: '',
      answers: {}
    }));
  }

  pickAnswer(questionId, choice) {
    console.log('EMITING PICK', questionId, choice);
    socket.emit('pick', {questionId, choice});
    this.setState(() => ({activeChoice: choice}));
  }

  submitName(e) {
    e.preventDefault();
    if (e.target[0].value === 'leohost123') {
      this.setState(() => ({isHost: true}));
      return;
    }
    socket.emit('join',
      e.target[0].value,
      (ok, error) => {
        if (ok) {
          this.setState(() => ({loggedIn: true}));
          return;
        }
        console.log('ERROR', error);
        this.userError = error;
      });
  }

  render() {
    let app;
    if (this.state.isHost) {
      app = <HostPage startGame={this.startGame}/>
    } else {
      if (this.state.gameInitiated) {
        if (this.state.gameFinished) {
          app = <Ranking/>
        } else {
          app = <div className="App">
            <header className="App-header">
              <Question
                question={questions[this.currentQuestionIndex].question}
              />
              <Timer
                totalQuestions={questions.length}
                setNextQuestion={this.setNextQuestion}
                time={this.state.timeDisplay}
                changeTimeDisplay={this.changeTimeDisplay}
                finishGame={this.finishGame}
              />
              <Bar
                activeChoice={this.state.activeChoice}
                number={this.state.answers}
              />
              <Answers
                activeChoice={this.state.activeChoice}
                pickAnswer={this.pickAnswer}
                answers={questions[this.currentQuestionIndex].answers}
                id={questions[this.currentQuestionIndex].id}
              />
            </header>
          </div>
        }
      }
      else {
        app = <LoadPage error={this.userError} submit={this.submitName}/>;
      }
    }
    return app;
  }
}

export default App;
