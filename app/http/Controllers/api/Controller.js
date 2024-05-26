 const autobind = require('auto-bind');
 const Recaptcha = require('express-recaptcha').RecaptchaV2
 const {validationResult} = require('express-validator/check');
const isMongoid = require('validator/lib/isMongoId');
const User = require('app/Models/user')



 module.exports = class Controller{   
    
    constructor(){

        autobind(this);     
    }
  
    failed(msg , res , statusCode = 500){
        res.status(statusCode).json({
            data : msg , 
            status : 'error'
        })
    }
}
