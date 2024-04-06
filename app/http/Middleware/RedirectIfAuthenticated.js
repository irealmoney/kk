const User = require('app/Models/user');
const middleware = require('./middleware');

class RedirectIfAuth extends middleware {
    
    handle(req , res ,next) {
        if(req.isAuthenticated())
            return res.redirect('/')
    
        next();
    }



}


module.exports = new RedirectIfAuth();