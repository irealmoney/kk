const User = require('app/Models/user');
const middleware = require('./middleware');

class RedirectIfAuth extends middleware {
    
    handle(req , res ,next) {
        if(req.isAuthenticated())  next();
        else return res.redirect('/auth/login')
    }




}


module.exports = new RedirectIfAuth();