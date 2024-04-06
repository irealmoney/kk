const User = require('app/Models/user');
const middleware = require('./middleware');

class RememberLogin extends middleware {
    
    handle(req , res ,next) {
        if(! req.isAuthenticated()) {
            const rememberToken = req.signedCookies.remember_Token;
            if(rememberToken) return this.userFind(rememberToken , req, next);
        }

        next();
    }

    userFind(rememberToken ,req,  next) {
        User.findOne({ rememberToken })
            .then(user => {
                if(user) {
                    req.logIn(user , err => {
                        if(err) next(err);
                        next();
                    });
                } else 
                    next();                
            })
            .catch(err => next(err));
    }


}


module.exports = new RememberLogin();