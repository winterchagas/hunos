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
      isHost: false,
      userError: '',
      rightChoice: '',
      seeRightAnswer: false
    };

    this.currentQuestionIndex = 0;

    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.pickAnswer = this.pickAnswer.bind(this);
    this.submitName = this.submitName.bind(this);
    // this.finishGame = this.finishGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.getRankings = this.getRankings.bind(this);
    this.showRightAnswer = this.showRightAnswer.bind(this);
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
    socket.emit('getRankings', (ok, rankings) => {
      if (ok) {
        console.log('GOT RANKINGS', rankings);
        const reducedRanking = this.reduceRankings(rankings);
        const rankingInArray = this.tranformInArray(reducedRanking);
        this.rankings = this.sortRankings(rankingInArray);
        this.setState(() => ({gameFinished: true}));
      } else {
        // todo? generate error
      }
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

  tranformInArray(ranking) {
    const rankingArray = [];
    for (let entry in ranking) {
      rankingArray.push([entry, ranking[entry].count, ranking[entry].sum]);
    }
    console.log('RANKING ARRAY', rankingArray);
    return rankingArray;
  }

  sortRankings(ranking) {
    const sortedRanking = ranking.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[2] - b[2];
      } else if (a[1] < b[1]) {
        return 1;
      }
      return -1;
    });
    console.log('SORTED ARRAY', sortedRanking);
    return sortedRanking;
  }

  setNextQuestion() {
    this.currentQuestionIndex = this.currentQuestionIndex + 1;
    this.setState(() => ({
      activeChoice: '',
      rightChoice: '',
      answers: {},
      seeRightAnswer: false
    }));
  }

  pickAnswer(questionId, activeChoice) {
    socket.emit('pick', {questionId, activeChoice, user: this.user}, (rightChoice) => {
      this.setState(() => ({activeChoice, rightChoice}));
    });
  }

  submitName(e) {
    e.preventDefault();
    socket.emit('join',
      e.target[0].value,
      (ok, response) => {
        if (ok) {
          if (!response) {
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

  showRightAnswer() {
    this.setState(() => ({seeRightAnswer: true}));
  }

  // todo barra do timer

  render() {
    let app;
    if (this.state.isHost) {
      app = <HostPage startGame={this.startGame}/>
    } else {
      if (this.state.gameStarted) {
        if (this.state.gameFinished) {
          app = <Ranking rankings={this.rankings}/>
        } else {
          app = <div className="App">
            <header className="App-header">
              <Question
                question={questions[this.currentQuestionIndex].question}
              />
              <Timer
                totalQuestions={questions.length}
                setNextQuestion={this.setNextQuestion}
                showRightAnswer={this.showRightAnswer}
                time={this.state.timeDisplay}
                getRankings={this.getRankings}
              />
              <Bar
                activeChoice={this.state.activeChoice}
                number={this.state.answers}
              />
              <Answers
                seeRightAnswer={this.state.seeRightAnswer}
                activeChoice={this.state.activeChoice}
                rightChoice={this.state.rightChoice}
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
