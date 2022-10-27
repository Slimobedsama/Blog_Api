const express = require('express');
const Router = express.Router();
const blogController = require('../controller/blogController');

Router.get('/', blogController.getAllBlogs);
Router.post('/', blogController.createBlog);

module.exports = Router;