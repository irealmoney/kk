 const autobind = require('auto-bind');
 const Recaptcha = require('express-recaptcha').RecaptchaV2
 const {validationResult} = require('express-validator/check');
const isMongoid = require('validator/lib/isMongoId');
const User = require('app/Models/user')



 module.exports = class Controller{   
    constructor(){
        autobind(this);
        this.recaptchaConfig();      
    }
    recaptchaConfig(){
        this.recaptcha = new Recaptcha(
                '6LfA1oUoAAAAAD8CqORzaYeg9K-BHj5yBe97TEZj' ,
                '6LfA1oUoAAAAAMT5ltztztSUFZ2Fch05DIz11EBh' , 
                {hl :'fa'} 
        )
    }
    recaptchaValidation(req , res){
        return new Promise((resolve , reject) => {
                this.recaptcha.verify(req , (err , data) => {
                    if(err) {

                        return this.AlertAndBack(req , res , {
                            title : 'ریکپچا ناموفق' , 
                            message : 'لطفا گزینه من ربات نیستم را فعال کنید' , 
                            type : 'error' , 
                            button : 'تایید'
                        })

                    } else resolve(true);
                })
            })
    }
    async validationData(req){
        const result = validationResult(req);
        if(! result.isEmpty()){

            const errors = result.array();
            const messages = [];
            errors.forEach(err => messages.push(err.msg));

                req.flash('errors' , messages)
                return false;
            
        }
        return true;
    }


    back(req , res){
        req.flash('keepData' , req.body);
        return res.redirect(req.header('Referer') || '/');
    }

    isMongoID(paramsID){
        if(! isMongoid(paramsID)) {
            this.error('آیدی وارد شده صحیح نمیباشد' , 404)
        }
    }

    error(message , status = 500){
        let err = new Error(message)
        err.status = status;
        throw err;
    }


    alert(req , data){
        let title = data.title || '' , 
        message = data.message || '' , 
        type = data.type || 'error' , 
        button = data.button || null , 
        timer = data.timer || 5000 ;


        return req.flash('sweetalert' , {title , message , type , button , timer})
    }

    AlertAndBack(req ,res ,data){
        this.alert(req, data);
        this.back(req , res)
    }
}
