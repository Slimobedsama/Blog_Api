const express = require('express');
const Router = express.Router();
const adminController = require('../controllers/admin.controller');
const validate = require('../validators/admin.validator');


Router.get('/', adminController.getAll);
// Router.get('/:id', adminController.getOne);
Router.post('/login', validate.validateAdninLogin, adminController.access);
// Router.patch('/:id', adminController.edit);

module.exports = Router;