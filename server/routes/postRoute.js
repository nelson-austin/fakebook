const router = require("express").Router();
const post = require('../controllers/PostController');
const validation = require('../middleware/validatePost');
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: `https://${process.env.ISSUER_BASE_URL}`
});

if (process.env.ENVIRONMENT == "testing"){
    router.get('/', post.getPosts);

    router.get('/post/:postId', post.getPostById)

    router.get('/user/:userId', post.getPostsByUserId);

    router.get('/:groupId', post.getPostsByGroupId);

    router.post('/', validation.postRules, post.createPost);

    router.put('/:postId', validation.postRules, post.updatePost);

    router.delete('/:postId', post.deletePost);
}else{
    router.get('/', post.getPosts);

    router.get('/post/:postId', post.getPostById)

    router.get('/user/:userId', post.getPostsByUserId);

    router.get('/:groupIds', post.getPostsByGroupIds);

    router.post('/', checkJwt, validation.postRules, post.createPost);

    router.put('/:postId', checkJwt, validation.postRules, post.updatePost);

    router.delete('/:postId', checkJwt, post.deletePost);
}



module.exports = router;