const express = require('express');
const router = express.Router();

// admin controller 
const ListsController = require('app/http/Controllers/ListsController');



router.get('/' , ListsController.ListPortal);
// router.get('/panel' , ListsController.adminDashboard);



module.exports = router;