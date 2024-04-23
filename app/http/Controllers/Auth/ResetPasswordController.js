const controller = require('app/http/Controllers/Controller')
const passport = require('passport')
const PasswordReset = require('app/Models/password-reset')
const User = require('../../../Models/user');
const uniqueString = require('unique-string');



class ForgotPasswordController extends controller{
    showResetForm(req , res){

        res.render('home/auth/passwords/reset' , { messages : req.flash('errors') , recaptcha : this.recaptcha.render() , token : req.params.token } );

    }
    async ResetProcces(req , res , next){
        await this.recaptchaValidation(req , res);
        let result =  this.validationData(req);

            if(result) this.ResetPass(req , res , next);
            else{
                return this.back(req , res);
            }
                
    }
    // jkhhiuhu89ui8j09jojd2039jd2


    async ResetPass(req , res ,next){
            let field = await PasswordReset.findOne({$and : [{email : req.body.email} , {token : req.body.token}]})
            if(!field){
                req.flash('errors' , 'اطلاعات وارد شده صحیح نمیباشد');
                return this.back(req,res);
            }

            if(field.use){
                req.flash('errors' , 'از این لینک قبلا استفاده شده');
                return this.back(req , res)
            }

            let user =await User.findOneAndUpdate({email : field.email} , {$set : {password : req.body.password}});
            if(!user) {
                req.flash('errors' , 'عملیات بازیابی رمز عبور انجام نشد')
                return this.back(req , res)
            }

            await field.updateOne({used : true})
            return res.redirect('/auth/login');
        
    }
}


module.exports = new ForgotPasswordController();


// <% if(errros.length > 0){ %>
//     <% errors.forEach(error =>{ %>

//         <%= error %><br>

//     <% })  %>
// <% } %>