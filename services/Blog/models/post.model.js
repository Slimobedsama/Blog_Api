const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
    title: {
        type: String,
        index: true,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['food', 'entertainment', 'travel', 'fashion'],
        index: true,
        required: true
    },
    pics: String,
    isPublished: {
        type: Boolean,
        default: false,
        required: true
    }
}, {timestamps: true});

postSchema.add({ cloudinaryId: String }); // ADDS A NEW FIELD TO AN EXISTING SCHEMA
postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'Post'
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;