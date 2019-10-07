const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

//Extract the full cart
router.get('/cart/get', checkAuth, (req, res, next) => {
  console.log(req.sessionID);
  console.log(req.session);
  let items =  req.session.user.cart.items;
  //var itemDetails = [];
  var ids = [];
  var quants = [];

  for (let i in items) {
    ids.push(items[i].prodId);
    quants.push(items[i].quantity);
  }

  Product.find({
    _id: {$in: ids}
  })
    .then(result => {
      //console.log(result);
      res.json({
        message: 'Cart Extracted Successfully',
        cart: result,
        quants: items
      });
    });

});

//Add product to cart
router.put('/cart/add/:_id', checkAuth, (req, res, next) => {
  //console.log(req.sessionID);
  //console.log(req.session);
  const cartProdIndex = req.session.user.cart.items.findIndex(prod => {
    return prod.prodId === req.params._id;
  })

  let newQuant = 1;
  let updatedCartItems = [...req.session.user.cart.items];

  if (cartProdIndex >= 0) {
    newQuant = req.session.user.cart.items[cartProdIndex].quantity + 1;
    updatedCartItems[cartProdIndex].quantity = newQuant;
  }
  else {
    updatedCartItems.push({prodId: req.params._id, quantity: 1});
  }

  updatedCart = {items: updatedCartItems};

  req.session.user.cart = updatedCart;

  User.updateOne({_id: req.session.user._id},
    {$set: {cart: updatedCart}})
    .then(result => {
      console.log(result);
      res.status(200).json({message: result});
    });
});

//Remove product from cart
router.put('/cart/remove/:_id', checkAuth, (req, res, next) => {
  const cartProdIndex = req.session.user.cart.items.findIndex(prod => {
    return prod.prodId === req.params._id;
  })

  let newQuant = 0;
  let updatedCartItems = [...req.session.user.cart.items];

  newQuant = req.session.user.cart.items[cartProdIndex].quantity - 1;

  if (newQuant === 0) {
    updatedCartItems.splice(cartProdIndex, 1);
  } else {
    updatedCartItems[cartProdIndex].quantity = newQuant;
  }

  updatedCart = {items: updatedCartItems};

  req.session.user.cart = updatedCart;

  User.updateOne({_id: req.session.user._id},
    {$set: {cart: updatedCart}})
    .then(result => {
      console.log(result);
      res.status(200).json({message: result});
    });
});

router.put('/orders/add', checkAuth, (req, res, next) => {
  //console.log(req);
  const userId = req.session.user._id;
  const cart = req.body.cart;

  //console.log(cart);

  const order = new Order({
    userId: userId,
    items: cart
  });
  order.save();
  req.session.user.cart = {items: []};
  User.updateOne({_id: req.session.user._id},
    {$set: {cart: req.session.user.cart}})
    .then(result => {
      console.log(result);
      res.status(200).json({message: result});
    });
});


//Extract the orders for the user
router.get('/orders/get', checkAuth, (req, res, next) => {

  Order.find({
    userId: req.session.user._id
  })
    .then(result => {
      //console.log(result);
      res.json({
        message: 'Orders Extracted Successfully',
        orders: result
      });
    });

});


module.exports = router;
