const Blog = require('../model/blogModel');
const validator = require('validator');

exports.getAllBlogs = async(req, res) => {
    try {
        const allBlogs = await Blog.find().sort({author: 'asc'});
        res.status(200).json(allBlogs);
    } catch(err) {
        res.status(500).json({error: 'Internal server error'});
    }
}

exports.getSingleBlog = async(req, res) => {
    const id = req.params.id
    try {
        const oneBlog = await Blog.findById(id)
        if(!oneBlog) {
            throw new Error(`Blog with id ${id} not found.`);
        }
        return res.status(200).json({message: oneBlog});
        
    } catch(err) {
        return res.status(400).json({error: err.message});
    }
}

exports.createBlog = async(req, res) => {
    const {author, title, snippet, body} = req.body;
    try {
        if(validator.isEmpty(author)) {
            throw new Error('Author is required');
        } else if(validator.isEmpty(title)) {
            throw new Error('Enter Blog Title');
        } else if(validator.isEmpty(snippet)) {
            throw new Error('Enter Blog Snippet');
        } else if(validator.isEmpty(body)) {
            throw new Error('Enter Blog Body');
        }
        
        const newBlog = await Blog.create(req.body);
        res.status(201).json({message: 'Blog Created', newBlog});
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

exports.updateBlogPost = async(req, res) => {
    const id = req.params.id
    try {
        const update = await Blog.findByIdAndUpdate(id, req.body, {new: true});
        if(!update) {
            throw new Error(`Blog with id ${id} cannot be found...`);
        }
        return res.status(201).json({message: 'Blog Update Successful', update});
    } catch(err) {
        return res.status(400).json({error: err.message});
    }
}

exports.removeBlog = async(req, res) => {
    const id = req.params.id;
    try {
        const delBlog = await Blog.findByIdAndDelete(id);
        if(!delBlog) {
            throw new Error(`Blog with id ${id} cannot be found...`);
        }
        res.status(200).json({message: `Blog with the id ${id} deleted.`, delBlog});
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}