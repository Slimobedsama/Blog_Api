const express = require('express');
const Router = express.Router();
const blogController = require('../controller/blogController');

Router.get('/', blogController.getAllBlogs);
Router.get('/:id', blogController.getSingleBlog);
Router.post('/', blogController.createBlog);


module.exports = Router;