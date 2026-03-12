const { query } = require('winston');
const Post = require('../models/post.model');

class PostDao {
    constructor() {
        this.Post = require('../models/post.model');
    }

    static async createPost(data) {
        return await Post.create(data);
    }

    static async updatePost(id, data) {
        return Post.findByIdAndUpdate(id, data, { new: true });
    }

    static async getAllPosts(page, limit, query) {
        return await Post.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
    }

    static async adminGetAllPosts(page, limit, query) {
        return await Post.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
    }

    static async getAllFoodPosts(page, limit, query) {
        return await Post.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
    }

    static async getAllTravelPosts(page, limit, query) {
        return await Post.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
    }

    static async getAllEntertaimentPosts(page, limit, query) {
        return await Post.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
    }

    static async getAllFashionPosts(page, limit, query) {
        return await Post.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
    }

    static async getSinglePost(id) {
        return Post.findById(id)
    }

    static async postsCount(query) {
        return await Post.countDocuments(query);
    }

    static async adminPostsCount(query) {
        return await Post.countDocuments(query);
    }

    static async removePost(id) {
        return await Post.findByIdAndDelete(id);
    }
}

module.exports = PostDao;