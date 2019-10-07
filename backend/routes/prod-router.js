const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const Product = require('../models/product');
const prods = require('../public/data/prod-sample')

//Get the products
router.get('', (req, res, next) => {
  console.log(req.cookies);
  Product.find()
    .then(prods => {
      res.json({
        message: 'Fetched products successfully',
        products: prods
      });
    });
});

//Get a product by Id
router.get('/:_id', checkAuth, (req, res, next) => {
  Product.findById(req.params._id).then(prod => {
    console.log('Product Found: '+prod);
    if(prod!=null) {
      return res.status(200).json(prod);
    }else{
      res.status(404).json({message: 'Product not found'});
    }
  })
});

module.exports = router;
