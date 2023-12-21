const express = require('express');
const Router = express.Router();
const commentController = require('../controller/commentController');

Router.get('/', commentController.every);
Router.get('/:id', commentController.getOne);
Router.post('/', commentController.create);
Router.patch('/:id', commentController.edit);

module.exports = Router;