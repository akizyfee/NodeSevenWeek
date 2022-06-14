var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/posts');
const { isAuth, generateSendJWT } = require('../service/auth');


router.get('/', PostsControllers.getPosts);

router.post('/', PostsControllers.createPost);

router.patch('/:id', PostsControllers.editPost);

router.delete('/', PostsControllers.deletePosts);

router.delete('/deletone/:id', PostsControllers.deleteOnePost);

router.post('/:id/like', isAuth, PostsControllers.addLikes);

router.delete('/:id/unlike', isAuth, PostsControllers.deleteLikes);

router.post('/:id/comment', isAuth, PostsControllers.createComment);

module.exports = router;