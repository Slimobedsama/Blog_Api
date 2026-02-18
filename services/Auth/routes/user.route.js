const express = require('express');
const Router = express.Router();
const userController = require('../controllers/user.controller');
// const { userValidateSignup, userUpdateValidation, resetPassValidate } = require('../../../utils/validation');
const { passwordAuth } = require('../../../utils/middleware/auth');

Router.get('/', userController.allUsers);
Router.get('/:id', userController.getSingleUser);
Router.post('/signup', userController.signup);
Router.post('/login', userController.login);
Router.post('/forgot-password', userController.lost);
Router.post('/reset-password/:id', passwordAuth,  userController.retrieve);
Router.patch('/:id', userController.updateUser);


module.exports = Router;