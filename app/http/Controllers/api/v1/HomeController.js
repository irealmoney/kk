const controller = require('app/http/Controllers/api/Controller');
const Posts = require('app/Models/posts');
// const User = require('app/Models/users');
const passport = require('passport')
const jwt = require('jsonwebtoken')
class HomeController extends controller{

    async user(req ,res){

        let user = await req.user.populate({path : 'roles' , populate : [{path : 'permissions'}]});


        res.json({
            data : this.filterUserData(user) , 
            status : 'success'
        })
    }

    filterUserData(user){
        return {
            id : user.id , 
            admin : user.admin , 
            name : user.name , 
            username : user.username , 
            email : user.email , 
            createdAt : user.createdAt , 
            roles : user.roles.map(role =>{
                return {
                    name : role.name , 
                    lable : role.lable , 
                    permissions : role.permissions.map(per =>{
                        return{
                            name : per.name , 
                            lable : per.lable
                        }
                    })
                }
            })
        }
    }
}
module.exports = new HomeController();