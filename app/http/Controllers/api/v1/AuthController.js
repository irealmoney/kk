const controller = require('app/http/Controllers/api/Controller');
const Posts = require('app/Models/posts');
const passport = require('passport')
const jwt = require('jsonwebtoken')
class AuthController extends controller{

    async Login(req ,res){

        if(! await this.validationData(req , res)) return;

        passport.authenticate('local.login' , {session : false} , (err , user) => {
            if(err) return this.failed(err.message , res , 500)
            if(!user) return this.failed('چنین کاربری وجود ندارد' , res , 404)

            req.login(user , {session : false} ,(err)=>{
                if(err) return this.failed(err.message , res);

                //create token
                const token = jwt.sign({id : user.id} , 'gq@g#/1fag3gdhkutl5bfa' , {
                    expiresIn : 60 * 60 * 24 * 2
                })

                return res.json({
                    data : {
                        token
                        } , 
                    status : 'success'
                })
            })
        })(req , res);
    }

}
module.exports = new AuthController();