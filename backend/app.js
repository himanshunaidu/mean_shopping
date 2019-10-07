const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const path = require('path');
//Set CORS using the following package
const cors = require('cors');

//Session
const session = require('express-session');
const MongoSessionStore = require('connect-mongodb-session')(session);

//Prevent CSRF attacks
const csurf = require('csurf');

const prodRouter = require('./routes/prod-router');
const adminRouter = require('./routes/admin-prod-router');
const shopRouter = require('./routes/shop-router');
const authRouter = require('./routes/auth-router');

const User = require('./models/user');

const MONGO_URI = '<MONGODB URL>';

const app = express();
//Following is for session storage in mongodb
const store = new MongoSessionStore({
  uri: MONGO_URI,
  collection: 'sessions',
});

/*app.use((req, res, next)=>{
  // The below 2 headers are for cookies
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});*/

app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200',
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}))

const csrfProtection = csurf();

mongoose.connect(MONGO_URI, {useNewUrlParser: true})
  .then(()=>{
    console.log('Connected to the MongoDB database');
  })
  .catch(()=>{
    console.log('Error connecting to database');
  });


//app.use(bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(session({secret: 'secret', resave: false, saveUninitialized: false,
  store: store}));
//}));

//app.use(csrfProtection);

//Grant static access to the images folder
app.use('/images', express.static(path.join('backend/public/images')));

app.use('/list/products', prodRouter);
app.use('/admin/product', adminRouter);
app.use('', shopRouter);
app.use('', authRouter);

module.exports = app;
