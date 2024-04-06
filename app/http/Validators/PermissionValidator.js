const Validator = require('./Validator');
const { check } = require('express-validator/check');
const Permission = require('app/Models/permission');
const { findOne } = require('../../Models/permission');



class PermissionValidator extends Validator {

    handle(){

        return [

            check('name')
                .isLength({min : 3})
                .withMessage('عنوان دسترسی نمیتواند کمتر از ۳ کاراکتر باشد')
                .custom(async (value , {req}) => {
                    if(req.query._method === 'put'){
                        let permission = await Permission.findById(req.params.id);
                            if(permission.name === value) return;
                    }
                    let permission = await Permission.findOne({ name : value });
                    if(permission) {
                        throw new Error('چنین دسترسی قبلا تعریف شده')
                    }

                }),

            check('lable')
                .not().isEmpty()
                .withMessage(' طرح دسترسی نمیتواند خالی بماند') 
        ]

    }

}


module.exports = new PermissionValidator();