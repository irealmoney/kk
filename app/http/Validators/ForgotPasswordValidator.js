const Validator = require('./Validator');
const { check } = require('express-validator/check');




class ForgotPasswordValidator extends Validator {

    handle(){

        return [
            check('email')
                .isEmail()
                .withMessage('*فیلد ایمیل معتبر نیست') 
        ]

    }

}




// req.checkBody('name' , 'فیلد نام نمیتواند خالی باشد!').notEmpty();
// req.checkBody('username' , 'نام کاربری وارد شده اشتباه است!').notEmpty();
// req.checkBody('password' , 'پسوورد وارد شده اشتباه است!').notEmpty();
// req.checkBody('password' , 'پسوورد وارد شده اشتباه است!').isLength({ min : 8 });
module.exports = new ForgotPasswordValidator();