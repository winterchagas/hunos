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
      isHost: false,
      userError: ''
    };

    this.currentQuestionIndex = 0;

    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.pickAnswer = this.pickAnswer.bind(this);
    this.submitName = this.submitName.bind(this);
    this.finishGame = this.finishGame.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    socket.on('connect', function () {
    });
    socket.on('newAnswer', (answers) => {
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

  getRankings() {
    socket.emit('getRankings', (rankings) => {
      const reducedRanking = this.reduceRankings(rankings);
      this.rankings = this.sortRankings(reducedRanking);
      this.setState(() => ({gameFinished: true}));
    });
  }

  reduceRankings(ranking) {
    let rankingReduced = {};
    for (let value of Object.values(ranking)) {
      for (let innerValue of value) {
        if (!rankingReduced[innerValue.user]) {
          rankingReduced[innerValue.user] = {count: 1, sum: innerValue.time};
        } else {
          rankingReduced[innerValue.user].count++;
          rankingReduced[innerValue.user].sum += innerValue.time
        }
      }
    }
    console.log('rankingReduced', rankingReduced);
    return rankingReduced;
  }

  sortRankings(ranking) {

  }

  setNextQuestion() {
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
    this.setState(() => ({
      activeChoice: '',
      answers: {}
    }));
  }

  pickAnswer(questionId, choice) {
    socket.emit('pick', {questionId, choice, user: this.user});
    this.setState(() => ({activeChoice: choice}));
  }

  submitName(e) {
    e.preventDefault();
    socket.emit('join',
      e.target[0].value,
      (ok, response) => {
        if (ok) {
          if(!response) {
            this.setState(() => ({isHost: true}));
            return;
          }
          this.user = response;
          this.setState(() => ({loggedIn: true}));
          return;
        }
        console.log('ERROR', response);
        this.setState(() => ({userError: response}));
      });
  }

  render() {
    let app;
    if (this.state.isHost) {
      app = <HostPage startGame={this.startGame}/>
    } else {
      if (this.state.gameStarted) {
        if (this.state.gameFinished) {
          app = <Ranking ranking={this.rankings}/>
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
                getRankings={this.getRankings}
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
        app = <LoadPage
          error={this.state.userError}
          submit={this.submitName}
          loggedIn={this.state.loggedIn}
        />;
      }
    }
    return app;
  }
}

export default App;
