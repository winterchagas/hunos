class Users {
  constructor() {
    this.users = [];
    this.id = 1;
  }

  addUser(name) {
    const duplicatedUser = this.users.some(user => user.name === name);
    if (duplicatedUser) {
      return null;
    }
    const user = {id: this.id, name};
    this.users.push(user);
    this.id++;
    console.log('USER ADDED', user, this.users);
    return user;
  }

  getUserList() {
    return this.users;
  }
}

module.exports = {Users};