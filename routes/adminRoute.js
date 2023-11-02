const express = require('express');
const Router = express.Router();
const adminController = require('../controller/adminController');
const { adminValidateSignup, adminEditValidation } = require('../utils/validation');


Router.get('/', adminController.getAll);
Router.get('/:id', adminController.getOne);
Router.post('/signup', adminValidateSignup, adminController.create);
Router.post('/login', adminController.access);
Router.patch('/:id', adminEditValidation, adminController.edit);

module.exports = Router;