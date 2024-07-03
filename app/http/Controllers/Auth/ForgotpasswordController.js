const controller = require('app/http/Controllers/Controller')
const passport = require('passport')
const PasswordReset = require('app/Models/password-reset')
const User = require('../../../Models/user');
const uniqueString = require('unique-string');
const nodemailer = require('nodemailer');
const mail = require('app/helpers/mail')

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




            const mailOption = {
                from: '"آژانس تبلیغاتی ما 👻" <magency67@gmail.com>', // sender address
                to: `${newPasswordReset.email}`, // list of receivers
                subject: "بازیابی کلمه عبور", // Subject line
                text: "Hello world?", // plain text body
                html: `
                <h2>بازیابی کلمه عبور</h2>

                <p>برای بازیابی کلمه عبور خود بر روی لینک زیر کلیک کنید</p>

                <a href="http://localhost:8080/auth/password/${newPasswordReset.token}">بازیابی</a>
                ` // html body
              };


              mail.sendMail(mailOption , (err , info) => {
                if(err) console.log(err)

                console.log("message send : %s" , info);

                this.alert(req , {
                    title : 'توجه'  , 
                    message : 'لینک بازیابی رمزعبور برای شما ارسال شد' , 
                    type : 'success' , 
                    timer : 3000
                })
              })



        
              res.redirect('/auth/login');
        }
    }
}


module.exports = new ForgotPasswordController();


// <% if(errros.length > 0){ %>
//     <% errors.forEach(error =>{ %>

//         <%= error %><br>

//     <% })  %>
// <% } %>