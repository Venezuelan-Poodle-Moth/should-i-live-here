const bcrypt = require('bcryptjs');
const db = require('../models/db');

// setting our number of encryption rounds to 10
const ROUNDS = 10;

const userController = {};

// create user middleware to add user to database
userController.createUser = (req, res, next) => {
  console.log('createUser controller hit');
  const { email, password, name } = req.body;
  // generating salt for hash password
  bcrypt.genSalt(ROUNDS, async (err, salt) => {
    // handling asynchronous functionality & generating hash with password and salt
    await bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      // inserting user info & hash into the database
      db.query(`INSERT INTO Users(email, hash, name)
      VALUES($1, $2, $3)`, [email, hash, name], async (error, user) => {
        if (error) {
          return next(error);
        }
      });
    });
  });
  // storing name and email to send back to frontend
  res.locals.user = { name, email };
  return next();
};

// create user middleware to verify a user is in the database upon login
userController.verifyUser = (req, res, next) => {
  console.log('verifyUser controller hit');
  // taking in only email and password upon login attempt
  const { email, password } = req.body;
  // sending get/select request to database to check for unique email
  db.query('SELECT * FROM Users WHERE email = $1', [email], (error, user) => {
    if (error) {
      return next({
        log: error,
        message: { err: 'there was an error querying the database' },
      });
    }

    // check if the provided email is in DB - if it's not - user.rows[0] is undefined
    if (!user.rows[0]) { res.locals.user = {}; return next(); }
    
    res.locals.user = user.rows[0];
    // utilizing bcrypt to compare our stored hashed/encrypted password against inputted password
    bcrypt.compare(password, user.rows[0].hash, (err, response) => {
      if (err) {
        return next({
          log: err,
          message: { err: 'there was an error with the bcrypt function' },
        });
      } if (!response) {
        // Password incorrect message will get sent to the frontend
        return next('Password was incorrect.');
      }
      return next();
    });
  });
};


userController.verifyGmailUser = (req, res, next) => {
  console.log('verifyGmailUser controller hit');
  // taking in only email and password upon login attempt
  const { email } = req.body;
  console.log(email);
  // sending get/select request to database to check for unique email
  db.query('SELECT * FROM gmailusers WHERE email = $1', [email], (error, user) => {
    if (error) {
      return next({
        log: error,
        message: { err: 'there was an error querying the database' },
      });
    }
    // res.locals.user = user.rows[0];
    // console.log(user);

    if (!user.rows[0]) {
      db.query('INSERT INTO gmailusers (email) VALUES ($1);', [email], (error, user) => {
        if (error) {
          return next({
            log: error,
            message: { err: 'there was an error querying the database' },
          });
        }
        //res.locals.gmailLogin = email;
      })
    }
    res.locals.gmailLogin = true;
    return next();
  });
};

module.exports = userController;
