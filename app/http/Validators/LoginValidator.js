const Validator = require('./Validator');
const { check } = require('express-validator/check');




class LoginValidator extends Validator {

    handle(){

        return [
            check('username')
                .not().isEmpty()
                .withMessage('*فیلد نام کاربری معتبر نیست') ,
                

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
module.exports = new LoginValidator();