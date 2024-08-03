const controller = require('app/http/Controllers/Controller');
const ActivationCode = require('app/Models/activationCode.js')


class UserPanelController extends controller{

    async activation(req , res ,next) {
         try {
            let activationCode = await ActivationCode.findOne({ code : req.params.code }).populate('user').exec();

            if(! activationCode ){
                this.alert(req , {
                    title : 'توجه کنید',
                    message : 'چنین لینک فعال سازی وجود ندارد',
                    button : 'تایید' , 
                })
                return res.redirect('/');
            }

            if( activationCode.expire < new Date() ) {
                this.alert(req , {
                    title : 'دقت کنید',
                    message : 'مهلت استفاده از این لینک به پایان رسیده است',
                    button : 'بسیار خوب'
                });

                return res.redirect('/');
            }

            if( activationCode.use){
                this.alert(req , {
                    title : 'توجه کنید',
                    message : 'این لینک قبلا استفاده شده',
                    type: 'warning',
                    button : 'تایید' , 
                })
                return res.redirect('/');
            }

            let user = activationCode.user;

            user.$set({active : true});
            activationCode.$set({use : true});

            await user.save();
            await activationCode.save();

            req.logIn(user , err => {
                user.setRememberToken(res);
                this.alert(req , {
                    title : 'با تشکر',
                    message : 'اطلاعات شما با موفقیت تایید شد',
                    type: 'success',
                    button : 'تایید' , 
                })
                return res.redirect('/');
            })
            
         }catch(err){
            next(err);
         }
    }


    async index(req , res , next){
        try {

            const title = 'Ma Agency |  پنل کاربری';
            res.render('home/panel/userpanel' , {recaptcha : this.recaptcha.render() , title});

        } catch(err){
            next(err);
        }
    }



    async tickets(req, res , next){
        try{
            const title = 'Ma Agency | تیکت ها ';
            res.render('home/panel/tickets',  { title});
        }catch(err){

        }
    }



    async EditInformation(req, res , next){
        try{
            const title = 'Ma Agency | ویرایش اطلاعات';
            res.render('home/panel/editinfo' , {title});
        }catch(err){

        }
    }



    async EmailVerify(req, res , next){
        try{
            const title = 'Ma Agency | تایید ایمیل';
            res.render('home/panel/emailVerify' , {title});
        }catch(err){

        }
    }

    


}
module.exports = new UserPanelController();