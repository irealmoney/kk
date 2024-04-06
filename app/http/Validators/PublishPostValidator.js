const Validator = require('./Validator');
const { check } = require('express-validator/check');
const Posts = require('app/Models/posts');
const path = require('path');


class PublishPostValidator extends Validator {

    handle(){    
        return [
            
            check('title')
                .not().isEmpty()
                .withMessage('فیلد عنوان سازه نمیتواند خالی باشد') ,

            check('location')
                .not().isEmpty()
                .withMessage('فیلد لوکیشن سازه معتبر نیست') ,
                

            check('type')
                .not().isEmpty()
                .withMessage('نوع تابلو را انتخاب کنید') ,


            check('address')
                .isLength({min : 12})
                .withMessage('آدرس سازه نمیتواند کمتر از ۱۲ کاراکتر باشد') ,

            check('image')
                .custom(async (value , {req})=>{
                    if(req.query._method === 'put' && value === undefined) return;
                    if(!value) throw new Error('وارد کردن تصویر سازه الزامیست')

                    let fileExt =  ['.jpg' , '.png' ,  '.jpeg' , '.svg']
                    if(!fileExt.includes(path.extname(value))) throw new Error('پسوند فایل وارد شده معتبر نیست : پسوند فایل باید jpg یا  png  باشد')
                }),

            check('code')
                .not().isEmpty()
                .withMessage('کد تابلو را وارد کنید ') 
                .custom(async (value , {req})=>{
                    if(req.query._method === 'put'){
                        let post = await Posts.findById(req.params.id)
                        if(post.code === value) return;
                    }
                    let post =  await Posts.findOne({slug : this.slug(value) })

                    if(post){
                        throw new Error('این سازه با این کد قبلا در سایت آپلود شده است .'); 
                    }
                 }),


            check('tags')
                .not().isEmpty()
                .withMessage('تگ پست الزامی است ') 
                
                
        ]

    }

    slug(title){
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
    }

}





module.exports = new PublishPostValidator();