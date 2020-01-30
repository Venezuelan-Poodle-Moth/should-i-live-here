const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

// route & middleware for registering a new user
router.post('/register', userController.createUser, (req, res) => res.status(200).json(res.locals.user));

// route & middleware for verifying a user login attempt
router.post('/login', userController.verifyUser, (req, res) => res.status(200).json(res.locals.user));



module.exports = router;
