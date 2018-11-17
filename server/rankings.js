const {correctAnswers} = require('./correctAnswers');

class Rankings {
  constructor() {
    this.rankings = {}
  }

  addRanking(questionId, choice, user) {
    console.log(`${correctAnswers[questionId].toLowerCase() === choice.toLowerCase() ? 'RIGHT' : 'WRONG'}`);
    if (correctAnswers[questionId].toLowerCase() === choice.toLowerCase()) {
      if (!this.rankings[questionId]) {
        this.rankings[questionId] = [];
      }
      const time = this.getTime();
      this.rankings[questionId].push({user: user.name, time});
    }
  }

  getTime() {
    const now = (Date.now() / 10000).toString();
    const nowSliced = now.substr(now.indexOf('.') - 4);
    console.log('TIME', parseFloat(nowSliced));
    return parseFloat(nowSliced);
  }

  getRanking() {
    console.log('FINAL RANKINGS', this.rankings);
    return this.rankings;
  }
}

module.exports = {Rankings};