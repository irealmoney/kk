const express = require('express');
const router = express.Router();


//Controllers
const PostController = require('app/http/Controllers/api/v1/PostController')

router.get('/posts' , PostController.Posts)

router.get('/posts/:post' , PostController.singlePost)

module.exports = router;