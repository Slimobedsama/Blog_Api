const express = require('express');
const Router = express.Router();
const blogController = require('../controllers/blogController');
const { adminAuth } = require('../../../utils/middleware/auth');
// const { blogValidation } = require('../../../utils/validation');
const upload = require('../../../utils/helpers/image');

Router.get('/', blogController.getAllBlogs);
Router.get('/:id', blogController.getSingleBlog);
Router.post('/', adminAuth, upload.single('pics'), blogController.createBlog);
Router.patch('/:id', blogController.updateBlogPost);
Router.delete('/:id', blogController.removeBlog);


module.exports = Router;