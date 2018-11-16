class Rankings {
  constructor() {
    this.rankings = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: []}
  }

  addRanking(id, questionNumber) {
    this.rankings[questionNumber].push(id);
    console.log('RANK ADDED', id, this.rankings);
  }

  getRanking() {
    return this.rankings;
  }
}

module.exports = {Rankings};