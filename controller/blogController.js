const Blog = require('../model/blogModel');

exports.getAllBlogs = async(req, res) => {
    try {
        const allBlogs = await Blog.find().sort({author: 'asc'});
        res.status(200).json(allBlogs);
    } catch(err) {
        res.status(500).json({msg: 'Internal server error'});
    }
}

exports.createBlog = async(req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.status(201).json({msg: 'Blog Created', newBlog});
    } catch(err) {
        res.status(400).json({msg: 'Bad Request'});
    }
}