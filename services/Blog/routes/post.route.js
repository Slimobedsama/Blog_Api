const express = require('express');
const Router = express.Router();
const postController = require('../controllers/post.controller');
const { adminAuth } = require('../../../utils/middleware/auth');
const upload = require('../../../utils/helpers/image');
const validate = require('../validators/post.validator');

Router.get('/', validate.validateAllPosts, postController.getAllBlogs);
Router.get('/food', validate.validateAllPosts, postController.getAllFoodBlogs);
Router.get('/travel', validate.validateAllPosts, postController.getAllTravelBlogs);
Router.get('/entertainment', validate.validateAllPosts, postController.getAllEntertainmentBlogs);
Router.get('/fashion', validate.validateAllPosts, postController.getAllFashionBlogs);
Router.get('/admin-posts', adminAuth, validate.validateAllPosts, postController.getAdminAllBlogs);
Router.get('/:id', validate.validateSinglePost, postController.getSingleBlog);
Router.post('/', adminAuth, upload.single('pics'), validate.validateCreatePost, postController.createBlog);
Router.patch('/publish-post/:id', adminAuth, validate.validatePublishPost, postController.publishPost);
Router.patch('/:id', adminAuth, upload.single('pics'), validate.validateUpdatePost, postController.updateBlogPost);
Router.delete('/:id', adminAuth, validate.validateSinglePost, postController.removeBlog);


module.exports = Router;