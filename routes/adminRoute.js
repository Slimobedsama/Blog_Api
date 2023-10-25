const express = require('express');
const Router = express.Router();
const adminController = require('../controller/adminController');


Router.get('/', adminController.getAll);
Router.post('/signup', adminController.create);

module.exports = Router;