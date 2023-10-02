const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    comment: [{type :Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;