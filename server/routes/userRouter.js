const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.createUser, (req, res) => res.status(200).json(res.locals.user));

router.post('/login', userController.verifyUser, (req, res) => res.status(200).json(res.locals.user));

module.exports = router;
