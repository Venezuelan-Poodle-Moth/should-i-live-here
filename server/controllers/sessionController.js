// NAT ADDITION, COMMENTS

const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  const { ssid } = req.cookies;
  Session.find({ cookieId: ssid }, (err, response) => {
    if (err || response.length === 0) {
      console.log('Error in sessionController.isLoggedIn', err);
      return res.redirect('/register');
    }
    return next();
  });
};

sessionController.startSession = (req, res, next) => {
  if (res.locals.userId === undefined) {
    return next('Error in startSession middleware');
  }
  Session.create({ cookieId: res.locals.userId }, (err, response) => {
    if (err) {
      console.log('sessionController.startSession error', err);
      return next('Error in startSession');
    }
    console.log('Session created');
    return next();
  });
};

module.exports = sessionController;
