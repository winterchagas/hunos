const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../build');
const port = process.env.PORT || 4000;
const {Users} = require('./users');
const {Rankings} = require('./rankings');
const {Answers} = require('./answers');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();
const rankings = new Rankings();
const answers = new Answers();

console.log(publicPath);

app.use(express.static(publicPath));

let gameStarted = false;

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (userName, callback) => {
    if (userName === 'leohost' ||
        userName === 'erichost123' ||
        userName === 'yinanhost123'
    ) {
      callback(true);
    }
    if (!gameStarted) {
      const userAdded = users.addUser(userName);
      if (userAdded) {
        callback(true, userAdded);
        return;
      }
      callback(false, 'User name already exists');
    } else {
      callback(false, 'Game already started =/');
    }

  });

  socket.on('startGame', () => {
    console.log('startGame');
    gameStarted = true;
    io.emit('gameStarted');
  });

  socket.on('pick', ({questionId, choice, user}) => {
    console.log('answer received', questionId, choice);
    const updatedAnswers = answers.addAnswer(questionId, choice);
    io.emit('newAnswer', updatedAnswers);
    rankings.addRanking(questionId, choice, user)
  });

  socket.on('getRankings', (callback) => {
    console.log('getRankings');
    const finalRanking = rankings.getRanking();
    if (finalRanking) {
      callback(true, finalRanking);
    } else {
      callback(false, 'Error getting final rankings');
    }
  });

  socket.on('finishGame', () => {
    gameStarted = false;
    // todo perform clean up
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
