// NAT ADDITION, COMMENTS

const path = require('path');
const User = require('../models/userModel');

const userController = {};

userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(`Error in userController.getAllUsers: ${JSON.stringify(err)}`);
    res.locals.users = users;
    return next();
  });
};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  User.create({ username, password }, (err, response) => {
    if (err) {
      console.log('Error in create user middleware: ', err);
      res.render(path.resolve(__dirname, '../../client/components/Register.jsx'));
    } else {
      res.locals.userId = response.id;
      return next();
    }
  });
};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.find({ username }, (err, response) => {
    if (err || response.length === 0 || response[0].password !== password) {
      res.render(path.resolve(__dirname, '../../client/components/Register.jsx'), { error: "Username and/or password don't match, please sign up." });
    } else {
      res.locals.userId = response[0].id;
      return next();
    }
  });
};

module.exports = userController;
