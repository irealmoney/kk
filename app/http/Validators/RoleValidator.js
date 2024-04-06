const Validator = require('./Validator');
const { check } = require('express-validator/check');
const Role = require('app/Models/Role');
const { findOne } = require('../../Models/permission');



class RoleValidator extends Validator {

    handle(){

        return [

            check('name')
                .isLength({min : 3})
                .withMessage('عنوان دسترسی نمیتواند کمتر از ۳ کاراکتر باشد')
                .custom(async (value , {req}) => {
                    if(req.query._method === 'put'){
                        let role = await Role.findById(req.params.id);
                            if(role.name === value) return;
                    }
                    let role = await Role.findOne({ name : value });
                    if(role) {
                        throw new Error('چنین دسترسی قبلا تعریف شده')
                    }

                }),
            check('permissions')
                .not().isEmpty()
                .withMessage(' فیلد اجازه ی دسترسی  نمیتواند خالی بماند') ,

            check('lable')
                .not().isEmpty()
                .withMessage(' طرح دسترسی نمیتواند خالی بماند') 
        ]

    }

}


module.exports = new RoleValidator();