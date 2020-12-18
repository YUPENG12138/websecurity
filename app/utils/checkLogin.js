const UserModel = require('../models/user');

exports.checkPassword =  async function ({ username, password }) {
  const res = await UserModel.getUser(username);
  if (res && res.password === password) {
    return true;
  }
  return false
}