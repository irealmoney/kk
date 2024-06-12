const controller = require('app/http/Controllers/Controller')
const passport = require('passport')
const PasswordReset = require('app/Models/password-reset')
const User = require('../../../Models/user');
const uniqueString = require('unique-string');



class ForgotPasswordController extends controller{
    showForgotForm(req , res){

        res.render('home/auth/passwords/email' , { messages : req.flash('errors') , recaptcha : this.recaptcha.render() } );

    }
    async tokenProcces(req , res , next){
        await this.recaptchaValidation(req , res);
        let result =  this.validationData(req);

            if(result) this.sendResetLink(req , res , next);
            else {
                return this.back(req , res);
            }
                
    }
    // jkhhiuhu89ui8j09jojd2039jd2


    async sendResetLink(req , res ,next){
        let user = await  User.findOne({email : req.body.email})
        if(!user){
            req.flash('errors' , 'چنین کاربری با این ایمیل وجود ندارد');
            return this.back(req , res);
        } else {
            const newPasswordReset = new PasswordReset({
                email : req.body.email , 
                token : uniqueString() 
            })

        await newPasswordReset.save();










        
        this.AlertAndBack(req , res , {
            title : '  موفق  ' , 
            message :  'لینک به ایمیل شمال اراسل شد' , 
            type : 'success' , 
            button : 'تایید' , 
            timer : 5000
        })
        }
    }
}


module.exports = new ForgotPasswordController();


// <% if(errros.length > 0){ %>
//     <% errors.forEach(error =>{ %>

//         <%= error %><br>

//     <% })  %>
// <% } %>