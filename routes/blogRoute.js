const express = require('express');
const Router = express.Router();
const blogController = require('../controller/blogController');
const { adminAuth } = require('../middleware/auth');
const { createBlogValidation } = require('../utils/validation');
const upload = require('../utils/image');

Router.get('/', blogController.getAllBlogs);
Router.get('/:id', blogController.getSingleBlog);
Router.post('/', adminAuth, upload.single('pics'), createBlogValidation, blogController.createBlog);
Router.patch('/:id', adminAuth, blogController.updateBlogPost);
Router.delete('/:id', adminAuth, blogController.removeBlog);


module.exports = Router;