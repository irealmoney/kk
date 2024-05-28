const express = require('express');
const router = express.Router();


//Controllers
const PostController = require('app/http/Controllers/api/v1/PostController')
const AuthController = require('app/http/Controllers/api/v1/AuthController')

const LoginValidator = require('app/http/Validators/LoginValidator');

router.get('/posts' , PostController.Posts)

router.get('/posts/:post' , PostController.singlePost)

router.post('/login' , LoginValidator.handle() , AuthController.Login)

module.exports = router;