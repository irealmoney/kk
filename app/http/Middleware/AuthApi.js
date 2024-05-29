const User = require('app/Models/user');
const middleware = require('./middleware');
const passport = require('passport');
const { user } = require('../Controllers/api/v1/HomeController');
class AuthApi extends middleware {
    
    handle(req , res ,next) {
        passport.authenticate('jwt' , {session : false} , (err , user , info) => {
            if(err || !user){
                return res.status(401).json({
                    data : info.message || ' اجازه ی دسترسی ندارید' ,
                    status : 'error'
                })
            }else{
                req.user = user;
                next();
            }
        })(req , res , next);
    }



}


module.exports = new AuthApi();