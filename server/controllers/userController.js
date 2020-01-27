const bcrypt = require('bcryptjs');
const db = require('../models/db');

const ROUNDS = 10;

const userController = {};

userController.createUser = (req, res, next) => {
  console.log('createUser controller hit');
  const { email, password, name } = req.body;
  bcrypt.genSalt(ROUNDS, async (err, salt) => {
    await bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      db.query(`INSERT INTO Users(email, hash, name)
      VALUES($1, $2, $3)`, [email, hash, name], async (error, user) => {
        if (error) {
          return next(error);
        }
        console.log(res.locals.user);
      });
    });
  });
  res.locals.user = { name, email };
  return next();
};

userController.verifyUser = (req, res, next) => {
  console.log('verifyUser controller hit');
  const { email, password } = req.body;
  db.query('SELECT * FROM Users WHERE email = $1', [email], (error, user) => {
    if (error) {
      return next({
        log: error,
        message: { err: 'there was an error querying the database' },
      });
    }
    console.log(user);
    res.locals.user = user.rows[0];
    bcrypt.compare(password, user.rows[0].hash, (err, response) => {
      if (err) {
        return next({
          log: err,
          message: { err: 'there was an error with the bcrypt function' },
        });
      } if (!response) {
        return next('Password was incorrect.');
      }
      return next();
    });
  });
};

module.exports = userController;
