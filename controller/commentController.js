const Comment = require('../model/commentModel');

exports.every = async(req, res)=> {
    try {
        const allComments = await Comment.find().populate('name', 'userName');
        res.status(200).json(allComments);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
}

exports.getOne = async(req, res)=> {
    const id = req.params.id;
    try {
        const singleComment = await Comment.findById(id).populate('name', 'userName');
        if(singleComment) {
            return res.status(200).json({ message: 'Success', data: singleComment });
        }
        throw new Error(`Comment with the id ${id} not found`);
    } catch (err) {
        res.status(404).json({ errors: err.message });
    }
}

exports.create = async(req, res)=> {
    const {name, content}= req.body;
    try {
        const newComment = await Comment.create({
            name: req.body.name,
            content: req.body.content
        });
        res.status(201).json({message: 'Comment created', newComment});
    } catch (err) {
        console.log(err.message);
        res.status(400).json({error: err.message});
    }
}

exports.edit = async(req, res)=> {
    const { content } = req.body;
    const id = req.params.id;
    try {
        const editComment = await Comment.findByIdAndUpdate(id, { content }, { new: true }).populate('name', 'userName');
        if(editComment) {
            return res.status(200).json({ message: 'Success', data: editComment });
        }
        throw new Error(`Comment with the id ${id} not found`)
    } catch (err) {
        res.status(404).json({ errors: err.message });
    }
}