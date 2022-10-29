const express = require('express');
const Router = express.Router();
const userController = require('../controller/userController');

Router.get('/', userController.allUsers);
Router.post('/signup', userController.signup);


module.exports = Router;