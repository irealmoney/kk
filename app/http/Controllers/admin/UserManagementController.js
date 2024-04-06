const controller = require('app/http/Controllers/Controller');
const Tickets = require('app/Models/tickets');
const User = require('app/Models/user');
const Role = require('app/Models/Role');


class UserManagementController extends controller {

    async ShowUsers(req , res , next){

            let page = req.query.page || 1;
            
            let users = await User.paginate({} ,{ page , sort : {createdAt : 1} , limit :  20 , populate : 'roles' })
            res.render('admin/users/users-Manage', {title : 'مدیریت کاربران ' , users})

    }

    async addrole(req , res , next){

        try{

            this.isMongoID(req.params.id);

            let user = await User.findById(req.params.id);
            let roles  = await Role.find({});
            if(!user) this.error('user is not exist' , 404);
                
            res.render('admin/users/addrole', {title : 'افزودن دسترسی به کاربران' , user , roles})
        }catch(err){
            next(err);
        }
}


async StoreAddRole(req, res , next){
    try{
        this.isMongoID(req.params.id);
       
        let user = await User.findById(req.params.id);
        if(!user) this.error('user is not exist' , 404);
            
        user.set({roles : req.body.roles});
        await user.save();
        
        res.redirect('/admin/panel/users')
    }catch(err){
        next(err);
    }
}

    async toggleAdmin(req , res , next){
        try{
            this.isMongoID(req.params.id)
            let user = await User.findById(req.params.id);
            user.set({admin : false });
            await user.save();
            return this.back(req , res)
        } catch(err){
            next(err);
        }
}
    async adminAccess(req, res, next){
        try{
            this.isMongoID(req.params.id)
            let user = await User.findById(req.params.id);
            user.set({admin : true });
            await user.save();
            return this.back(req , res)
        } catch(err){
            next(err);
        }
}

    async destroy(req ,res, next){
        try{
            this.isMongoID(req.params.id)
            let users = await User.findById(req.params.id);

            if(!users){
            this.error('user is not exist' , 404);
            }

            //delete post
            users.deleteOne();
    
            return res.redirect('/admin/panel/users');
        } catch(err){
            next(err);
        }
    }

}



module.exports = new UserManagementController();