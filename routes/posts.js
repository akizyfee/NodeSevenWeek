var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/posts');


router.get('/', PostsControllers.getPosts);

router.post('/', PostsControllers.createPost);

router.patch('/:id', PostsControllers.editPost);

router.delete('/', PostsControllers.deletePosts);

router.delete('/deletone/:id', PostsControllers.deleteOnePost);

module.exports = router;