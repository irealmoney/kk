const express = require('express');
const router = express.Router();

const ForAll = require('./public');
const ForUser = require('./private');


router.use(ForAll);


module.exports = router;