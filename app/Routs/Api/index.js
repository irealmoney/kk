const express = require('express');
const router = express.Router();

const apiv1 = require('./api-v1/index')


router.use('/api/v1' , apiv1);

module.exports = router;