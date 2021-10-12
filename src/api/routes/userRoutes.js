const express = require('express');
const router = express.Router();
const userController = require('../controllers/Users/UserController');
const auth = require("../middlewares/auth");

router.get('/', auth, userController.getUsers);

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post("/welcome", auth, userController.welcome);

module.exports = router;