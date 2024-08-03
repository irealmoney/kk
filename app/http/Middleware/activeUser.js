const middleware = require('./middleware');
const User = require('app/Models/user');

class activeUser extends middleware {
    
    handle(req , res ,next) {
        if(req.isAuthenticated()){
            if(req.user.active) return next();

            this.alert(req , {
                title : 'توجه' ,
                message : 'حساب کاربری شما احراز هویت نشده است' ,
                type : 'warning',
                button : 'تایید'
            })


            req.logout();
            res.clearCookie('remember_Token')
            res.redirect('/auth/login')
        }else
            next();
    }



}


module.exports = new activeUser();