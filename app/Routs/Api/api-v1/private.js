const express = require('express');
const router = express.Router();

// controller
const HomeController = require('app/http/Controllers/api/v1/HomeController')



router.get('/user' , HomeController.user)

module.exports = router;