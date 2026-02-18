const express = require('express');
const Router = express.Router();
const commentController = require('../controllers/commentController');
const { userAuth } = require('../../../utils/middleware/auth');

Router.get('/', commentController.every);
Router.get('/:id', commentController.getOne);
Router.post('/', userAuth, commentController.create);
Router.patch('/:id', userAuth, commentController.edit);

module.exports = Router;