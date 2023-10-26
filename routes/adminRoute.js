const express = require('express');
const Router = express.Router();
const adminController = require('../controller/adminController');
const adminValidateSignup = require('../utils/validation');


Router.get('/', adminController.getAll);
Router.post('/signup', adminValidateSignup, adminController.create);

module.exports = Router;