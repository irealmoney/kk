const express = require('express');
const router = express.Router();

//middleware 
const RedirectIfAuthenticated = require('app/http/Middleware/RedirectIfAuthenticated');
const RedirectIfNotAdmin = require('app/http/Middleware/RedirectIfNotAdmin');
const ErrorHandler = require('app/http/Middleware/ErrorHandler');






//admin route
const AdminRoute = require('./admin')
router.use('/admin', RedirectIfNotAdmin.handle , AdminRoute);
// auth router 
const authRoute = require('./Auth')
router.use('/auth', RedirectIfAuthenticated.handle ,  authRoute);

// home router
const HomeRoute = require('./home')
router.use('/' , HomeRoute) 

const ListRouter = require('./lists-page')
router.use('/list-portal' , ListRouter) 


// handle errors
router.all('*' , ErrorHandler.error404);
router.use(ErrorHandler.handler);



module.exports = router;