const User = require('app/Models/user');
const middleware = require('./middleware');

class ConvertFileToField extends middleware {
    
    handle(req , res ,next) {
        
        if(!req.file){
            req.body.image = undefined;
        }else{
            req.body.image = req.file.filename;
        }
        next();

    }



}


module.exports = new ConvertFileToField();