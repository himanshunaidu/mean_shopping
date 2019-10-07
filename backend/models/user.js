const mongoose = require('mongoose');

const userschema = mongoose.Schema({
  _id: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  cart: {type: Object, required: true}
});

module.exports = mongoose.model('User', userschema);
