const express = require('express');
const Router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/authMiddleware');

Router.get('/', auth, userController.allUsers);
Router.post('/signup', userController.signup);
Router.post('/login', userController.login);


module.exports = Router;