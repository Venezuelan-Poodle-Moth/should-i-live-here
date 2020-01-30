const bcrypt = require('bcryptjs');
const db = require('../models/db');

// setting our number of encryption rounds to 10
const ROUNDS = 10;

const userController = {};

//checks for email conflict when a user tries to create an account
userController.emailConflict = (req, res, next) => {
  //check to see if email exists in db
  const email = req.body.email;
  db.query(
    'SELECT * FROM Users WHERE email = $1',
    [email],
    (err, response, req) => {
      if (err) {
        return next(err);
      } else {
        if (response.rows.length === 0) {
          //we didn't get anything back from our query to the db which means there's no existing user with that email in the db
          console.log('res.rows.length === 0', response.rows);
          return next();
        } else {
          // if we did receive something back from the db query, it means there's an existing user with that email. Send to the frontend
          console.log('res.rows-------', response.rows);
          user = {
            userCreated: false
          };
          console.log('user in emailConflict: ', user);
          res.json(user);
        }
      }
    }
  );
};

// create user middleware to add user to database
userController.createUser = (req, res, next) => {
  //******** have to add logic that will check if a user with that username already exists. If so, send message to the frontend that a user with the username already exists.
  //***  added constraint to email column in Users table that requires each email to be unique - if a user tries to create an account with an existing email, the db will respond with an error. We should then send a message to be displayed on the frontend that an account already exists with that email
  console.log('createUser controller hit');
  const { email, password, name } = req.body;
  console.log(
    `req.body at createUser - email: ${req.body.email}, password: ${req.body.password}, name: ${req.body.name}`
  );
  // generating salt for hash password
  bcrypt.genSalt(ROUNDS, async (err, salt) => {
    // handling asynchronous functionality & generating hash with password and salt
    await bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      // inserting user info & hash into the database
      db.query(
        `INSERT INTO Users(email, hash, name)
      VALUES($1, $2, $3)`,
        [email, hash, name],
        async (error, user) => {
          if (error) {
            console.log(
              'error adding user to db due to an account already using that email',
              error
            );
            return next();
          }
        }
      );
    });
  });

  // storing name and email to send back to frontend
  const userCreated = true;
  res.locals.user = { name, email, userCreated };
  //add a key userCreated and set to true if a new user was created or false if there was a conflict
  console.log(`res.locals.user at createUser ${res.locals.user}`);
  return next();
};

// create user middleware to verify a user is in the database upon login
userController.verifyUser = (req, res, next) => {
  console.log('verifyUser controller hit');
  // taking in only email and password upon login attempt
  const { email, password } = req.body;
  console.log(
    `req.body at verifyUser - email: ${req.body.email}, password: ${req.body.password}`
  );
  // sending get/select request to database to check for unique email
  db.query('SELECT * FROM Users WHERE email = $1', [email], (error, user) => {
    //******** have to add logic here that will send a message to the frontend that we couldn't find a user with that email address registered in the DB.
    // *** if there is an error, that means they've entered an email address that we don't have in our db.
    if (error) {
      return next({
        log: error,
        message: { err: 'there was an error querying the database' }
      });
    }

    res.locals.user = user.rows[0];
    // utilizing bcrypt to compare our stored hashed/encrypted password against inputted password
    bcrypt.compare(password, user.rows[0].hash, (err, response) => {
      if (err) {
        return next({
          log: err,
          message: { err: 'there was an error with the bcrypt function' }
        });
      }
      if (!response) {
        console.log('response in bcrypt compare', response.detail);
        // Password incorrect message will get sent to the frontend
        return next('Password was incorrect.');
      }
      return next();
    });
  });
};

module.exports = userController;
