const Comment = require('../model/commentModel');

exports.every = async(req, res)=> {
    try {
        const allComments = await Comment.find();
        res.status(200).json(allComments);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
}

exports.create = async(req, res)=> {
    const {userName, content}= req.body;
    try {
        const newComment = await Comment.create({
            userName: req.body.userName,
            content: req.body.content
        });
        res.status(201).json({message: 'Comment created', newComment});
    } catch (err) {
        console.log(err.message);
        res.status(400).json({error: err.message});
    }
}