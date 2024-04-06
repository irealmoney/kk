const Validator = require('./Validator');
const { check } = require('express-validator/check');




class RegisterValidator extends Validator {

    handle(){

        return [
            check('name')
                .not().isEmpty()
                .withMessage('فیلد نام معتبر نیست!')
                .isLength({min : 8})
                .withMessage('فیلد نام نمیتواند کمتر از ۸ کاراکتر باشد') ,

                check('email')
                .isEmail()
                .withMessage('فیلد ایمیل معتبر نیست') ,

            check('username')
                .not().isEmpty()
                .withMessage('فیلد نام کاربری معتبر نیست') ,

            check('password')
                .not().isEmpty()
                .withMessage('فیلد کلمه عبور نمیتواند خالی باشد!')
                .isLength({min : 8})
                .withMessage('فیلد کلمه عبور نمیتواند کمتر از ۸ کاراکتر باشد')
        ]

    }

}




// req.checkBody('name' , 'فیلد نام نمیتواند خالی باشد!').notEmpty();
// req.checkBody('username' , 'نام کاربری وارد شده اشتباه است!').notEmpty();
// req.checkBody('password' , 'پسوورد وارد شده اشتباه است!').notEmpty();
// req.checkBody('password' , 'پسوورد وارد شده اشتباه است!').isLength({ min : 8 });
module.exports = new RegisterValidator();