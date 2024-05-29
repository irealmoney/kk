const express = require('express');
const router = express.Router();

const ForAll = require('./public');
const ForUser = require('./private');

//middleware
const AuthApi = require('app/http/Middleware/AuthApi')

router.use(ForAll);
router.use(AuthApi.handle ,ForUser)



module.exports = router;