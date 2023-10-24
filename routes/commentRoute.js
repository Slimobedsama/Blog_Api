const express = require('express');
const Router = express.Router();
const commentController = require('../controller/commentController');

Router.get('/', commentController.every);
Router.post('/', commentController.create);

module.exports = Router;