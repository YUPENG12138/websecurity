const mongoose = require('mongoose');
const schema = mongoose.Schema({
  username: String,
  password: String,
});

schema.statics.getUser = function(username) {
  return this.model('user')
    .findOne({ username })
    .exec();
};

schema.statics.createUser = function({ username, password }) {
  return this.model('user')
    .create({
      username,
      password,
    });
};

const model = mongoose.model('user', schema);

module.exports = model;