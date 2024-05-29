 const autobind = require('auto-bind');
 const Recaptcha = require('express-recaptcha').RecaptchaV2
 const {validationResult} = require('express-validator/check');
const isMongoid = require('validator/lib/isMongoId');
const User = require('app/Models/user')



 module.exports = class Controller{   
    
    constructor(){

        autobind(this);     
    }

    async validationData(req , res){
        const result = validationResult(req);
        if(! result.isEmpty()){

            const errors = result.array();
            const messages = [];
            errors.forEach(err => messages.push(err.msg));

                this.failed(messages , res , 403)
                return false;
            
        }
        return true;
    }
  
    failed(msg , res , statusCode = 500){
        res.status(statusCode).json({
            data : msg , 
            status : 'error'
        })
    }
}
