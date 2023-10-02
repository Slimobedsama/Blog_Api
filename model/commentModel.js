const mongoose = require('mongoose');
const Schema = new mongoose.Schema;

const commentSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;