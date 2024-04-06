const Validator = require('./Validator');
const { check } = require('express-validator/check');




class commentValidator extends Validator {

    handle(){

        return [
            check('title')
                .not().isEmpty()
                .withMessage('وارد کردن عنوان الزامیست') , 
                
            check('comment')
                .not().isEmpty()
                .withMessage('برای ارسال نظرات فیلد متن نمیتواند خالی باشد') ,

            check('comment')
                .isLength({min : 10})
                .withMessage('متن وارد شده باید بیشتر از ۱۰ کاراکتر باشد') 
                    
        ]

    }

}




// req.checkBody('name' , 'فیلد نام نمیتواند خالی باشد!').notEmpty();
// req.checkBody('username' , 'نام کاربری وارد شده اشتباه است!').notEmpty();
// req.checkBody('password' , 'پسوورد وارد شده اشتباه است!').notEmpty();
// req.checkBody('password' , 'پسوورد وارد شده اشتباه است!').isLength({ min : 8 });
module.exports = new commentValidator();