const mongoose = require('mongoose');

const orderschema = mongoose.Schema({
  userId: {type: Number, required: true},
  items: [{
    _id: {type: Number, required: true},
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    imagePath: {type: String, required: true},
    userId: {type: String, required: true},
    quantity: {type: Number, required: true}
  }]
});

module.exports = mongoose.model('Order', orderschema);
