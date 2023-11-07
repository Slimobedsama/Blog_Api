const express = require('express');
const Router = express.Router();
const blogController = require('../controller/blogController');
const { auth } = require('../middleware/auth');
const { createBlogValidation } = require('../utils/validation');
const upload = require('../utils/image');

Router.get('/', auth, blogController.getAllBlogs);
Router.get('/:id', auth, blogController.getSingleBlog);
Router.post('/', upload.single('pics'), createBlogValidation, blogController.createBlog);
Router.patch('/:id', auth, blogController.updateBlogPost);
Router.delete('/:id', auth, blogController.removeBlog);


module.exports = Router;