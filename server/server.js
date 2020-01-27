const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); // NAT ADDITION, COMMENTS
const bcrypt = require('bcryptjs'); // NAT ADDITION, COMMENTS
const jwt = require('jsonwebtoken'); // NAT ADDITION, COMMENTS
const db = require('./models/db');
const userTable = require('./models/userModel');
const secret = 'krabbyPattySecretFormula'; // NAT ADDITION, COMMENTS

// NAT ADDITION, COMMENTS
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

const app = express();
// parse incoming json
app.use(express.json());

app.use(cookieParser());

app.use('/build', express.static(path.join(__dirname, '../build')));

// NAT ADDITION, COMMENTS
app.use(express.urlencoded({ extended: true }));

// NAT ADDITION, COMMENTS
app.get('/', cookieController.setCookie, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

// NAT ADDITION, COMMENTS
app.get('/register', (req, res) => {
  res.render('./../client/components/Register', { error: null });
});

// NAT ADDITION, COMMENTS
app.post('/register',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.isLoggedIn,
  sessionController.startSession,
  (req, res) => {
    if (res.locals) {
      res.sendFile(path.resolve(__dirname, '../index.html'));
    }
  });

// NAT ADDITION, COMMENTS
app.post('/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.isLoggedIn,
  sessionController.startSession,
  (req, res) => {
    if (res.locals.userId) {
      res.sendFile(path.resolve(__dirname, '../index.html'));
    }
  });

// NAT ADDITION, COMMENTS
let passwordDb = '';
app.get('/encrypt', (req, res) => {
  const ROUNDS = 10;
  bcrypt.hash(req.query.password, ROUNDS, (err, hash) => {
    passwordDb = hash;
    res.send({
      ROUNDS,
      encrypted: hash,
    });
  });
});

// NAT ADDITION, COMMENTS
app.get('/compare', (req, res) => {
  const comparePassword = req.query.password;
  bcrypt.compare(comparePassword, passwordDb, (err, result) => {
    res.send(result);
  });
});

// NAT ADDITION, COMMENTS
app.get('/createjwt', (req, res) => {
  const userObj = {
    authenticated: true,
  };
  const token = jwt.sign(userObj, secret);
  res.cookie('token', token);
  res.send(token);
});

// NAT ADDITION, COMMENTS
app.get('/verify', (req, res) => {
  const jwtNew = req.cookies.token;
  jwt.verify(jwtNew, secret, (err, decoded) => {
    if (err) {
      console.log('ERROR: ', err);
      res.send(err);
    } else {
      res.send(decoded);
    }
  });
});

// create userTable when server starts up if it doesn't yet exist
db.query(userTable, (err, res) => {
  if (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log('Port listening on 3000');
});
