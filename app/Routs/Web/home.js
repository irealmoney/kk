const express = require('express');
const router = express.Router();

// home Controller
const homeController = require('app/http/Controllers/HomeController');


// controller
const RegisterController = require('app/http/Controllers/Auth/userRegister');
const LoginController = require('app/http/Controllers/Auth/userLogin');
const ForgotPasswordController =require('app/http/Controllers/Auth/ForgotpasswordController')
const ResetPasswordController = require('app/http/Controllers/Auth/ResetPasswordController')
const UserPanelController = require('app/http/Controllers/UserPanelController')
const PostController = require('app/http/Controllers/PostController')


//Validator
const RegisterValidator = require('app/http/Validators/RegisterValidator');
const LoginValidator = require('app/http/Validators/LoginValidator');
const ForgotPasswordValidator = require('app/http/Validators/ForgotPasswordValidator');
const ResetPasswordValidator = require('app/http/Validators/ResetPasswordValidator')
const commentValidator = require('app/http/Validators/commentValidator')
// middleware 
const RedirectIfAuthenticated = require('app/http/middleware/RedirectIfAuthenticated');
const RedirectIfNotAdmin = require('app/http/middleware/RedirectIfNotAdmin');
const RedirectIfNotAuthenticated = require('app/http/middleware/RedirectIfNotAuthenticated')


router.get('/' , homeController.index);

router.get('/pics' , PostController.Bpictures);
router.get('/pics/:id' , PostController.single);


// send tickets
router.get('/tickets' , PostController.ticketFormShow)
router.post('/comment' , RedirectIfNotAuthenticated.handle , commentValidator.handle() ,  PostController.comment)

router.get('/portal-list' , homeController.ListPortal)

router.get('/user-panel', RedirectIfNotAuthenticated.handle , UserPanelController.index)
router.put('/user-panel/:id')
router.get('/user-panel/ticket' , RedirectIfNotAuthenticated.handle , UserPanelController.tickets)
router.get('/user-panel/user-info-edit' , RedirectIfNotAuthenticated.handle , UserPanelController.EditInformation )
router.get('/user-panel/email-verify' , RedirectIfNotAuthenticated.handle , UserPanelController.EmailVerify )


// reset password in user panel

// router.get('/user-panel/password/reset',  ForgotPasswordController.showForgotForm);
// router.post('/user-panel/password/email' ,  ForgotPasswordValidator.handle() , ForgotPasswordController.tokenProcces);

// router.get('/user-panel/password/:token' , ResetPasswordController.showResetForm );
// router.post('/user-panel/password/reset' , ResetPasswordValidator.handle() , ResetPasswordController.ResetProcces);

// post likes 

router.post('/pics/like/:id' , PostController.like)

router.get('/logout' , (req , res)=>{
    req.logout();
    res.clearCookie('remember_Token')
    res.redirect('/auth/login')
})


// sitemap
router.get('/sitemap.xml' , homeController.sitemap);


//RSS
router.get('/feed/pics' , homeController.feedPosts)
module.exports = router;