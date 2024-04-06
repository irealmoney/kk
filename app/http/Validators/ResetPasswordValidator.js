const Validator = require('./Validator');
const { check } = require('express-validator/check');




class ResetPasswordValidator extends Validator {

    handle(){

        return [
            check('email')
                .isEmail()
                .withMessage('*فیلد ایمیل معتبر نیست') , 
                
            check('token')
            .not().isEmpty()
            .withMessage('توکن معتبر نیست یا از دسترس خارج شده') ,
                    
            check('password')
            .isLength({min : 8})
            .withMessage('*کلمه عبور نمیتواند کمتر از ۸ کاراکتر باشد')
        ]

    }

}




// req.checkBody('name' , 'فیلد نام نمیتواند خالی باشد!').notEmpty();
// req.checkBody('username' , 'نام کاربری وارد شده اشتباه است!').notEmpty();
// req.checkBody('password' , 'پسوورد وارد شده اشتباه است!').notEmpty();
// req.checkBody('password' , 'پسوورد وارد شده اشتباه است!').isLength({ min : 8 });
module.exports = new ResetPasswordValidator();