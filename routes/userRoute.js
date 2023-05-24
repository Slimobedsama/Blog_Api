const express = require('express');
const Router = express.Router();
const userController = require('../controller/userController');

Router.get('/', userController.allUsers);
Router.get('/:id', userController.getSingleUser);
Router.post('/signup', userController.signup);
Router.post('/login', userController.login);
Router.patch('/:id', userController.updateUser);


module.exports = Router;