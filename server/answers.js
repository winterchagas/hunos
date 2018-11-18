class Answers {
  constructor() {
    this.answers = {}
  }

  addAnswer(id, choice) {
    if (!this.answers[id]) {
      this.answers[id] = {};
      if (!this.answers[id][choice]) {
        this.answers[id][choice] = 1;
      }
    } else {
      if (!this.answers[id][choice]) {
        this.answers[id][choice] = 1;
      } else {
        this.answers[id][choice] = this.answers[id][choice] + 1;
      }
    }
    return this.answers[id];
  }

  resetAnswers() {
    this.answers = {}
  }
}

module.exports = {Answers};