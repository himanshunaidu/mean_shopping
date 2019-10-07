const express = require('express');
const router = express.Router();
//For image upload, multer would process the uploaded files
const multer = require('multer');

//To protect routes
const checkAuth = require('../middleware/check-auth');

const Product = require('../models/product');
const prods = require('../public/data/prod-sample');

//Mime-type for the image uploaded
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //Recheck validity of image
    const isValid = MIME_TYPE_MAP[file.mimetype]; //returns null if mimetype not present
    let error = new Error('Invalid Mime Type');
    if(isValid) {
      error = null;
    }
    //The path required in the cb, is seen relative to the server.js file
    cb(error, 'backend/public/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('_');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
  //Get the hosting url
  const url = req.protocol + '://' + req.get('host');
  const imagePath = url + '/images/' + req.file.filename;
  const prod = new Product({
    _id: req.body._id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imagePath: imagePath,
    userId: req.session.user._id
  });
  prod.save();
  console.log(prod);
  res.status(201).json({
    message: 'Product added successfully',
    imageUrl: imagePath
  });
});

router.delete('/:_id', checkAuth, (req, res, next) => {
  Product.deleteOne({_id:req.params._id})
    .then(result => {
      console.log(result);
      res.status(200).json({message: 'Product Deleted'});
    });
});

router.put('/:_id', checkAuth, multer({storage: storage}).single('image'), (req, res, next) => {
  //If req.file exists, then a new image was uploaded
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }

  const prod = new Product({
    _id: req.body._id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imagePath: imagePath,
    userId: req.session.user._id
  })
  console.log(prod);
  Product.updateOne({_id:req.params._id}, prod)
    .then(result => {
      console.log(result);
      res.status(200).json({message: 'Product Edited'});
    });

})


module.exports = router;
