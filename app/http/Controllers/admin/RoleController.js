const controller = require('app/http/Controllers/Controller')
const Role = require('app/Models/Role');
const Permission = require('app/Models/permission');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');




class RoleController extends controller{
    
    async show(req ,res){
        let page = req.query.page || 1;
        let roles = await Role.paginate({},{page , sort : {createdAt : -1} , limit : 10});
        res.render('admin/roles/show', { title : 'مدیریت | نمایش سطوح دسترسی' , roles } );
    }

    async Publishform(req , res , next){
        try{
            let permissions = await Permission.find({});
            res.render('admin/roles/store', { title : 'مدیریت | افزودن سطح دسترسی' , permissions} );
        }catch(err){
            next(err);
        }
    }

    async store(req , res , next){
        let status = await this.validationData(req);
        if(! status) return this.back(req, res)

        let { name , lable , permissions} = req.body;

        let newRole = new Role({
            name ,
            lable , 
            permissions
        })
        await newRole.save();

        return res.redirect('/admin/panel/users/roles');
    }

    
    async destroy(req ,res, next){
        try{
            this.isMongoID(req.params.id)
            let roles = await Role.findById(req.params.id);

            if(!roles){
               this.error('post is not avaible' , 404);
            }
    

            //delete post
            roles.deleteOne();
     
            return res.redirect('/admin/panel/users/roles');
        } catch(err){
            next(err);
        }
    }


    async edit(req , res , next){
            try{
                this.isMongoID(req.params.id);

                let role = await Role.findById(req.params.id)
                let permission = await Permission.find({});

                if(!role) this.error('چنین سطح دسترسی وجود ندارد' , 404);
                return res.render('admin/roles/edit' , {role , permission});

            } catch(err){
                next(err);
            }
    }

    async update(req, res, next){
        try{ 
            let status = await this.validationData(req);
            if(! status) return this.back(req, res)

            let { name , lable , permissions } = req.body;

            await Role.findByIdAndUpdate(req.params.id , {$set : {
                name , 
                lable ,
                permissions
            }})
            //redirect
            return res.redirect('/admin/panel/users/roles');
        }catch(err){
            next(err);
        }
    }







}

module.exports = new RoleController();
