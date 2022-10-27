const Blog = require('../model/blogModel');

exports.getAllBlogs = async(req, res) => {
    try {
        const allBlogs = await Blog.find().sort({author: 'asc'});
        res.status(200).json(allBlogs);
    } catch(err) {
        res.status(500).json({msg: 'Internal server error'});
    }
}

exports.getSingleBlog = async(req, res) => {
    const id = req.params.id
    try {
        const oneBlog = await Blog.findById(id)
        res.status(200).json(oneBlog);
    } catch(err) {
        res.status(400).json({msg: `Invalid requested id ${id}`});
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

exports.updateBlogPost = async(req, res) => {
    const id = req.params.id
    try {
        const update = await Blog.findByIdAndUpdate(id, req.body);
        res.status(201).json({msg: 'Blog Update Successful', update});
    } catch(err) {
        res.status(400).json({msg: 'Unable to update'});
    }
}