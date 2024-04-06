const controller = require('app/http/Controllers/Controller')
const passport = require('passport')
const {checkBody , GetValidationResult} = require('express-validator')




class adminRequestController extends controller{
    auth(req , res){
        const title = 'Ma Agency | صفحه عضویت کاربر' ;
        
        res.render('home/auth/Register' , { recaptcha : this.recaptcha.render() , title  } );

    }
    async reqProccesor(req , res , next){
        await this.recaptchaValidation(req , res);
        let result = await this.validationData(req);

            if(result) return this.register(req , res , next);
            else{
            return this.back(req , res);
            }
    }



    register(req , res , next) {
        passport.authenticate('local.register' , { 
            successRedirect : '/auth/login',
            failureRedirect : '/auth/register',
            failureFlash : true
        })(req, res , next);
    }
}


module.exports = new adminRequestController();


// <% if(errros.length > 0){ %>
//     <% errors.forEach(error =>{ %>

//         <%= error %><br>

//     <% })  %>
// <% } %>