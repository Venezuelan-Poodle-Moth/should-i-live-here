const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

// route & middleware for registering a new user
router.post('/register', userController.createUser, (req, res) => res.status(200).json(res.locals.user));

// route & middleware for verifying a user login attempt
router.post('/login', userController.verifyUser, (req, res) => res.status(200).json(res.locals.user));

router.post('/gmailLogin', userController.verifyGmailUser, (req, res) => {
  if (res.locals.gmailLogin) {
    res.status(400).json(res.locals.gmailLogin);
  }
  else {
    res.status(200).json(res.locals.gmailLogin);
  }
});

module.exports = router;
