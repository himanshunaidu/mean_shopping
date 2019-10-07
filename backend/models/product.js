const mongoose = require('mongoose');

const prodschema = mongoose.Schema({
  _id: {type: Number, required: true},
  title: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String},
  imagePath: {type: String, required: true},
  userId: {type: Number, required: true}
});

module.exports = mongoose.model('Product', prodschema);
