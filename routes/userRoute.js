const express = require('express');
const Router = express.Router();
const userController = require('../controller/userController');
const { userValidateSignup, userUpdateValidation } = require('../utils/validation');

Router.get('/', userController.allUsers);
Router.get('/:id', userController.getSingleUser);
Router.post('/signup', userValidateSignup, userController.signup);
Router.post('/login', userController.login);
Router.patch('/:id', userUpdateValidation, userController.updateUser);


module.exports = Router;