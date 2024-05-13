const Blog = require('../model/blogModel');
const cloudinary = require('../utils/cloud');

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
    const { author, title, body, pics, cloudinaryId } = req.body;
    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'blog_images' });
        const newBlog = await Blog.create({
            author: req.body.author,
            title: req.body.title,
            body: req.body.body,
            pics: result.secure_url,
            cloudinaryId: result.public_id
        });
        res.status(201).json({message: 'Blog Created', newBlog});
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

exports.updateBlogPost = async(req, res) => {
    const id = req.params.id
    const { author, title, body, pics } = req.body;
    try {
        const update = await Blog.findByIdAndUpdate(id, { author, title, body, pics }, { new: true });
        if(!update) {
            throw new Error(`Blog with id ${id} cannot be found...`);
        }
        return res.status(201).json({message: 'Blog Update Successful', data: update });
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
        res.status(200).json({message: `Blog with the id ${id} deleted.` });
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}