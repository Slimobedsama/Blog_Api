const PostDao = require('../dao/post.dao');
const cloudinary = require('../../../utils/helpers/cloud');
const ApiErrors = require('../../../utils/errors/api.errors');

async function createPostFactory(data, file) {
    let result;

    if(file) {
        result =  await cloudinary.uploader.upload(file.path, { folder: 'blog_images'})
    }
    
    const postData = {
        ...data,
        pics: result?.secure_url,
        cloudinaryId: result?.public_id
    }

    const newPost = await PostDao.createPost(postData);

    return {
        status: 201,
        message: 'Post created successfully',
        result: newPost
    }
}

async function allPostsFactory(queries) {
    const page = parseInt(queries.page) || 1;
    const limit = parseInt(queries.limit) || 10;
    const query = { isPublised: true };
    
    if(queries?.title?.trim()) {
        query.title = { $regex: queries.title.trim(), $options: 'i' }
    }

    const [allPosts, countPosts] = await Promise.all([
        PostDao.getAllPosts(page, limit, query),
        PostDao.postsCount(query)
    ]);

    if(!allPosts) return {
        status: 200,
        error: 'NOT_FOUND',
        message: 'No post found',
        result: allPosts
    }
    
    return {
        status: 200,
        error: null,
        message: `Posts retrieved, ${allPosts.length} posts found`,
        result: allPosts,
        page,
        total: countPosts,
        pages: Math.ceil(countPosts / limit),
    }
}

async function adminAllPostsFactory(queries) {
    const page = parseInt(queries.page) || 1;
    const limit = parseInt(queries.limit) || 10;
    const query = {};
    
    if(queries?.title?.trim()) {
        query.title = { $regex: queries.title, $options: 'i' }
    }

    if(queries?.category?.trim()) {
        query.title = { $regex: queries.category, $options: 'i' }
    }

    const [allPosts, countPosts] = await Promise.all([
        PostDao.adminGetAllPosts(page, limit, query),
        PostDao.adminPostsCount(query)
    ]);

    if(!allPosts) return {
        status: 200,
        error: 'NOT_FOUND',
        message: 'No post found',
        result: allPosts
    }
    
    return {
        status: 200,
        error: null,
        message: `Posts retrieved, ${allPosts.length} posts found`,
        result: allPosts,
        page,
        total: countPosts,
        pages: Math.ceil(countPosts / limit),
    }
}

async function allFoodPostsFactory(queries) {
    const page = parseInt(queries.page) || 1;
    const limit = parseInt(queries.limit) || 10;
    const query = { isPublised: true, category: 'food' };
    
    if(queries?.title?.trim()) {
        query.title = { $regex: queries.title.trim(), $options: 'i' }
    }

    const [allPosts, countPosts] = await Promise.all([
        PostDao.getAllPosts(page, limit, query),
        PostDao.postsCount(query)
    ]);

    if(!allPosts) return {
        status: 200,
        error: 'NOT_FOUND',
        message: 'No post found',
        result: allPosts
    }
    
    return {
        status: 200,
        error: null,
        message: `Posts retrieved, ${allPosts.length} posts found`,
        result: allPosts,
        page,
        total: countPosts,
        pages: Math.ceil(countPosts / limit),
    }
}

async function allTravelPostsFactory(queries) {
    const page = parseInt(queries.page) || 1;
    const limit = parseInt(queries.limit) || 10;
    const query = { isPublised: true, category: 'travel' };
    
    if(queries?.title?.trim()) {
        query.title = { $regex: queries.title.trim(), $options: 'i' }
    }

    const [allPosts, countPosts] = await Promise.all([
        PostDao.getAllPosts(page, limit, query),
        PostDao.postsCount(query)
    ]);

    if(!allPosts) return {
        status: 200,
        error: 'NOT_FOUND',
        message: 'No post found',
        result: allPosts
    }
    
    return {
        status: 200,
        error: null,
        message: `Posts retrieved, ${allPosts.length} posts found`,
        result: allPosts,
        page,
        total: countPosts,
        pages: Math.ceil(countPosts / limit),
    }
}

async function allEntertainmentPostsFactory(queries) {
    const page = parseInt(queries.page) || 1;
    const limit = parseInt(queries.limit) || 10;
    const query = { isPublised: true, category: 'entertainment' };
    
    if(queries?.title?.trim()) {
        query.title = { $regex: queries.title.trim(), $options: 'i' }
    }

    const [allPosts, countPosts] = await Promise.all([
        PostDao.getAllPosts(page, limit, query),
        PostDao.postsCount(query)
    ]);

    if(!allPosts) return {
        status: 200,
        error: 'NOT_FOUND',
        message: 'No post found',
        result: allPosts
    }
    
    return {
        status: 200,
        error: null,
        message: `Posts retrieved, ${allPosts.length} posts found`,
        result: allPosts,
        page,
        total: countPosts,
        pages: Math.ceil(countPosts / limit),
    }
}

async function allFashionPostsFactory(queries) {
    const page = parseInt(queries.page) || 1;
    const limit = parseInt(queries.limit) || 10;
    const query = { isPublised: true, category: 'fashion' };
    
    if(queries?.title?.trim()) {
        query.title = { $regex: queries.title.trim(), $options: 'i' }
    }

    const [allPosts, countPosts] = await Promise.all([
        PostDao.getAllPosts(page, limit, query),
        PostDao.postsCount(query)
    ]);

    if(!allPosts) return {
        status: 200,
        error: 'NOT_FOUND',
        message: 'No post found',
        result: allPosts
    }
    
    return {
        status: 200,
        error: null,
        message: `Posts retrieved, ${allPosts.length} posts found`,
        result: allPosts,
        page,
        total: countPosts,
        pages: Math.ceil(countPosts / limit),
    }
}


async function getOnePostFactory(id) {
    const getOnePost = await PostDao.getSinglePost(id);

    if(!getOnePost) throw ApiErrors.notFound('Post not found', 'NOT_FOUND');

    return {
        status: 200,
        error: null,
        message: 'Post found',
        result: getOnePost
    }
}

async function updatePostFactory(id, data, file) {
    const getOldPost = await PostDao.getSinglePost(id);
    let updateImg;
    
    if(file) {

        if(getOldPost.cloudinaryId) {
            await cloudinary.uploader.destroy(getOldPost.cloudinaryId);
        }

        updateImg = await cloudinary.uploader.upload(file.path, { folder: 'blog_images'})
    }

    const updateData = {
        ...data,
        pics: updateImg?.secure_url,
        cloudinaryId: updateImg?.public_id
    }
    
    const result = await PostDao.updatePost(id, updateData);
    
    if(!result) throw ApiErrors.notFound('Post not found', 'NOT_FOUND');

    return {
        status: 200,
        error: null,
        message: 'Post successfully updated',
        result
    }
}

async function deletePostFactory(id) {
    const getOldPost = await PostDao.getSinglePost(id);
    
    if(!getOnePostFactory && getOldPost.cloudinaryId) {
        await cloudinary.uploader.destroy(getOldPost.cloudinaryId);
    }
    
    const result = await PostDao.removePost(id);
    
    if(!result) throw ApiErrors.notFound('Post not found', 'NOT_FOUND');

    return {
        status: 200,
        error: null,
        message: 'Post successfully deleted',
        result
    }
}

async function publishPostFactory(id, data) {
    const publishPost = await PostDao.updatePost(id, data);

    if(!publishPost) throw ApiErrors.notFound('Post not found', 'NOT_FOUND');

    return {
        status: 200,
        error: null,
        message: 'Post published successfully',
        result: publishPost
    }
}

module.exports = {
    createPostFactory,
    allPostsFactory,
    adminAllPostsFactory,
    getOnePostFactory,
    updatePostFactory,
    deletePostFactory,
    publishPostFactory,
    allFoodPostsFactory,
    allTravelPostsFactory,
    allEntertainmentPostsFactory,
    allFashionPostsFactory,
}