const tryAndCatch = require('../../../utils/helpers/try.catch');
const { createPostFactory, allPostsFactory, adminAllPostsFactory, getOnePostFactory, updatePostFactory,deletePostFactory, publishPostFactory, allFoodPostsFactory, allTravelPostsFactory, allEntertainmentPostsFactory, allFashionPostsFactory
} = require('../factories/post.factory');

exports.getAllBlogs = tryAndCatch(async(req, res) => {
    const{ status, ...more } = await allPostsFactory(req.query);
   
    res.status(status).json({ status, ...more });
});

exports.getAdminAllBlogs = tryAndCatch(async(req, res) => {
    const{ status, ...more } = await adminAllPostsFactory(req.query);
   
    res.status(status).json({ status, ...more });
});

exports.getSingleBlog = tryAndCatch(async(req, res) => {
    const id = req.params.id
    const { status, ...more } = await getOnePostFactory(id)

    res.status(status).json({ status, ...more });
});

exports.createBlog = tryAndCatch(async(req, res) => {
    const { status, ...more } = await createPostFactory(req.body, req.file);
    
    res.status(status).json({ status, ...more });
});

exports.updateBlogPost = tryAndCatch(async(req, res) => {
    const id = req.params.id
    const { status, ...more } = await updatePostFactory(id, req.body, req.file)
    
    res.status(status).json({ status, ...more });
});

exports.removeBlog = tryAndCatch(async(req, res) => {
    const id = req.params.id;
    const { status, ...more } = await deletePostFactory(id);
    
    res.status(200).json({ status, ...more });
});

exports.publishPost = tryAndCatch(async(req, res) => {
    const id = req.params.id
    const { status, ...more } = await publishPostFactory(id, req.body);
    
    res.status(status).json({ status, ...more });
});

exports.getAllFoodBlogs = tryAndCatch(async(req, res) => {
    const{ status, ...more } = await allFoodPostsFactory(req.query);
   
    res.status(status).json({ status, ...more });
});

exports.getAllTravelBlogs = tryAndCatch(async(req, res) => {
    const{ status, ...more } = await allTravelPostsFactory(req.query);
   
    res.status(status).json({ status, ...more });
});

exports.getAllEntertainmentBlogs = tryAndCatch(async(req, res) => {
    const{ status, ...more } = await allEntertainmentPostsFactory(req.query);
   
    res.status(status).json({ status, ...more });
});

exports.getAllFashionBlogs = tryAndCatch(async(req, res) => {
    const{ status, ...more } = await allFashionPostsFactory(req.query);
   
    res.status(status).json({ status, ...more });
});