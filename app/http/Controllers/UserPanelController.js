const controller = require('app/http/Controllers/Controller');



class UserPanelController extends controller{
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