const controller = require('app/http/Controllers/Controller')
const passport = require('passport')
const {checkBody , GetValidationResult} = require('express-validator')
const ActivationCode = require('app/Models/activationCode')
const uniqueString = require('unique-string');
const mail = require('app/helpers/mail')



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
                timer : 3000
            })

            }
        }
 


        async login(req ,res , next) {
            passport.authenticate('local.login' , async (err , user) => {
                if(!user) return res.redirect('/auth/login');
    

                if(! user.active){

                    let activecode = await ActivationCode.find({user : user.id}).gt('expire' , new Date()).sort({createdAt : 1}).populate('user').limit(1).exec()

                    if(activecode.length){
                        this.AlertAndBack(req , res , {
                            title : 'توجه کنید',
                            message : 'لینک فعال سازی حساب کاربری به ایمیل شما ارسال شده لطفا 10 دقیقه ی دیگر تلاش کنید',
                            type : 'warning', 
                        })
                        return;
                    } else {
                        // create activation code
                        let code = uniqueString();
                        let newActiveCode = new ActivationCode({
                            user : user.id , 
                            code , 
                            expire : Date.now() + 1000 * 60 * 10
                        })
                        await newActiveCode.save();
                        // return res.json(newActiveCode)

                        //send email
                        const mailOption = {
                            from: '"آژانس تبلیغاتی ما" <magency67@gmail.com>', // sender address
                            to: `${user.email}`, // list of receivers
                            subject: "فعال سازی حساب کاربری", // Subject line
                            text: "Hello world?", // plain text body
                            html: `
                            <h2>بازیابی کلمه عبور</h2>
            
                            <p>برای بازیابی کلمه عبور خود بر روی لینک زیر کلیک کنید</p>
            
                            <a href="http://localhost:8080/user/activation/${newActiveCode.code}">فعال سازی</a>
                            ` // html body
                        };

                        mail.sendMail(mailOption , (err , info) => {
                            if(err) console.log(err)
            
                            console.log("message send : %s" , info);
            
                            this.AlertAndBack(req , res , {
                                title : 'توجه کنید',
                                message : 'لینک فعال سازی حساب کاربری برای شما ارسال شد' ,
                                type : 'warning', 
                                timer : '6000'
                            })
                            // this.alert(req , {
                            //     title : 'توجه'  , 
                            //     message : 'لینک فعال سازی حساب کاربری برای شما ارسال شد' , 
                            //     type : 'success' , 
                            //     timer : '6000'
                                
                            // })
                          });

                          return;

                    }
                }


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