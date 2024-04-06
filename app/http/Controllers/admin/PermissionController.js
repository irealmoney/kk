const controller = require('app/http/Controllers/Controller')
const Permission = require('app/Models/permission');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');




class PermissionController extends controller{
    
    async show(req ,res){
        let page = req.query.page || 1;
        let permissions = await Permission.paginate({},{page , sort : {createdAt : -1} , limit : 10});
        res.render('admin/permissions/show', { title : 'مدیریت | نمایش دسترسی ها' , permissions } );
    }

    Publishform(req , res , next){
        try{
            res.render('admin/permissions/store', { title : 'مدیریت | افزودن دسترسی' } );
        }catch(err){
            next(err);
        }
    }

    async setPermission(req , res , next){
        let status = await this.validationData(req);
        if(! status) return this.back(req, res)

        let { name , lable } = req.body;

        let newPermission = new Permission({
            name ,
            lable
        })
        await newPermission.save();

        return res.redirect('/admin/panel/users/permissions');
    }

    
    async destroy(req ,res, next){
        try{
            this.isMongoID(req.params.id)
            let permissions = await Permission.findById(req.params.id);

            if(!permissions){
               this.error('post is not avaible' , 404);
            }
    

            //delete post
            permissions.deleteOne();
     
            return res.redirect('/admin/panel/users/permissions');
        } catch(err){
            next(err);
        }
    }


    async edit(req , res , next){
            try{
                this.isMongoID(req.params.id)
                let permission = await Permission.findById(req.params.id);

                if(!permission) this.error('چنین پستی وجود ندارد' , 404);
                return res.render('admin/permissions/edit' , {permission});

            } catch(err){
                next(err);
            }
    }

    async update(req, res, next){
        try{ 
            let status = await this.validationData(req);
            if(! status) return this.back(req, res)

            let { name , lable } = req.body;

            await Permission.findByIdAndUpdate(req.params.id , {$set : {
                name , 
                lable
            }})
            //redirect
            return res.redirect('/admin/panel/users/permissions');
        }catch(err){
            next(err);
        }
    }







}

module.exports = new PermissionController();
