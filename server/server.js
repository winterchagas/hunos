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

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (userName, callback) => {
    const userAdded = users.addUser(userName);
    if (userAdded) {
      callback(true);
      return;
    }
    callback(false, 'User name already exists');
  });

  socket.on('pick', ({questionId, choice}) => {
    console.log('answer received', questionId, choice);
    const updatedAnswers = answers.addAnswer(questionId, choice);
    io.emit('newAnswer', updatedAnswers);
  });

  socket.on('startGame', () => {
    io.emit('gameStarted');
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
