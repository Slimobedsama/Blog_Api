const express = require('express');
const Router = express.Router();
const commentController = require('../controller/commentController');

Router.get('/', commentController.every);

module.exports = Router;