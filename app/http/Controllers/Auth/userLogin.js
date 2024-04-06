const controller = require('app/http/Controllers/Controller')
const passport = require('passport')
const {checkBody , GetValidationResult} = require('express-validator')



class adminLoginController extends controller{
        auth(req , res){
            const title = 'Ma Agency | صفحه ورود کاربر' ;
            res.render('home/auth/Login' , { recaptcha : this.recaptcha.render() , title } );
    
        }

        async loginProccess(req  ,res , next) {



            await this.recaptchaValidation(req , res);
            let result = await this.validationData(req)
            if(result) {
                return this.login(req, res , next)
            } else{

            return this.AlertAndBack(req , res , {
                title : 'عملیات ناموفق' , 
                message : 'نام کاربری یا رمز عبور اشتباه است' , 
                type : 'error' , 
                button : 'ok'
            })

            }
        }
 


        login(req ,res , next) {
            passport.authenticate('local.login' , (err , user) => {
                if(!user) return res.redirect('/auth/login');
    
                req.logIn(user , err => {
                    if(req.body.rememberLog) {
                        user.setRememberToken(res);
                    }
    
                    return res.redirect('/');
                })
    
            })(req, res , next);
        }



    


}




module.exports = new adminLoginController();


// <% if(errros.length > 0){ %>
//     <% errors.forEach(error =>{ %>

//         <%= error %><br>

//     <% })  %>
// <% } %>