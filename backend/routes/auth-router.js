const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mailer = require('../middleware/mailer');

//Signup
router.post('/signup', (req, res, next) => {
  //console.log('Check backend');
  const user = new User({
    _id: req.body.user._id,
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password,
    cart: {items: []}
  });
  //console.log(user);
  user.save();
  /*mailer.sendMail({
    to: req.body.user.email,
    from: 'shop@node-complete.com',
    subject: 'Signup Succeeded',
    html: '<h1>You successfully signed up</h1>'
  });*/
  res.status(200).json({
    message: 'Posted Successfully'
  })
});

//Login
router.get('/login', (req, res, next) => {
  //console.log(req);
  const name = req.query.name;
  const password = req.query.password;
  console.log(name + ': ' + password);
  User.findOne({name: name, password: password})
    .then(result => {
      //console.log(result);
      //Setting cookie
      /*if (result) {
        res.cookie('loggedIn', 'true');
        //console.log(res);
        res.status(200).json({login: true});
      } else {
        res.status(200).json({login: false}); }
      */

      //Setting session
      if (result) {
        req.session.isLoggedIn = true;
        req.session.user = result;
        req.session.save();
        console.log(req.session);
        console.log(req.sessionID);
        //console.log(result);
        //console.log(req.session);

        //Send mail
        /*var email = {
          to: [req.session.user.email],
          from: 'roger@tacos.com',
          subject: 'Hi there',
          text: 'Awesome sauce',
          html: '<b>Awesome sauce</b>'
        };

        mailer.sendMail(email, function(err, res) {
            if (err) {
                console.log(err)
            }
            console.log(res);
        });*/

        res.status(200).json({login: true});
        } else {
        res.status(200).json({login: false}); }
      })
});

router.use('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.status(200).json({message: 'Logged Out'});
  });
});

module.exports = router;
