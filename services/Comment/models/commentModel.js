const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId, 
        ref: 'Post',
        required: true,
        index: true 
    },
    name: {
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    content: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;