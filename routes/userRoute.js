const express = require('express');
const Router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/authMiddleware');

Router.get('/', auth, userController.allUsers);
Router.get('/:id', auth, userController.getSingleUser);
Router.post('/signup', userController.signup);
Router.post('/login', userController.login);
Router.patch('/:id', userController.updateUser);


module.exports = Router;