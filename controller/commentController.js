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