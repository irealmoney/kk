const express = require('express');
const router = express.Router();

// admin controller 
// const AdminController = require('app/http/Controllers/admin/AdminController');






// controller
const RegisterController = require('app/http/Controllers/Auth/userRegister');
const LoginController = require('app/http/Controllers/Auth/userLogin');
const ForgotPasswordController =require('app/http/Controllers/Auth/ForgotpasswordController')
const ResetPasswordController = require('app/http/Controllers/Auth/ResetPasswordController')



//Validator
const RegisterValidator = require('app/http/Validators/RegisterValidator');
const LoginValidator = require('app/http/Validators/LoginValidator');
const ForgotPasswordValidator = require('app/http/Validators/ForgotPasswordValidator');
const ResetPasswordValidator = require('app/http/Validators/ResetPasswordValidator')

// middleware 




router.use((req , res , next) => {
    res.locals.layout = "home/auth/master";
    next();
})

// login
router.get('/login' , LoginController.auth);
router.post('/login' , LoginValidator.handle()  , LoginController.loginProccess);



// router
router.get('/register' , RegisterController.auth);
router.post('/register' , RegisterValidator.handle() , RegisterController.reqProccesor);

//password reset
router.get('/password/reset',  ForgotPasswordController.showForgotForm);
router.post('/password/email' ,  ForgotPasswordValidator.handle() , ForgotPasswordController.tokenProcces);

router.get('/password/:token' , ResetPasswordController.showResetForm );
router.post('/password/reset' , ResetPasswordValidator.handle() , ResetPasswordController.ResetProcces);






module.exports = router;