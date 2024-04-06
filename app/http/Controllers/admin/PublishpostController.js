const controller = require('app/http/Controllers/Controller')
const Posts = require('app/Models/posts');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');




class PublishController extends controller{
    
    async postFormShow(req ,res){
        
        res.render('admin/Publishpost', { title : 'افزودن سازه' } );

    }









    async publish(req, res , next){

        try{
            let status = await this.validationData(req)

            if(! status){
                //delete duplicate file
    
                if(req.file) fs.unlinkSync(req.file.path , (err)=>{});
                return this.back(req , res);
            } else{
                // get values from body
                let images = this.imageResize(req.file);
                
                let {title , location , type , status , width , height , address , code , tags} = req.body;
                // add body to schema
                let newpost  = new Posts({
                    user : req.user._id ,
                    title,
                    slug : this.slug(code),
                    type,
                    status ,
                    images,
                    width , 
                    height  ,
                    thumb : images[480] ,
                    address,
                    location,
                    code,
                    tags
                });
                await newpost.save();
    
                this.AlertAndBack(req , res , {
                    title : '  موفق  ' , 
                    message : 'مشخصات با موفقیت ثبت شد' , 
                    type : 'success' , 
                    button : 'ok' , 
                    timer : 5000
                })
                return res.redirect('/admin/panel/addpost')
            } 
        } catch(err){
            next(err)
        }
        
    }


    async destroy(req ,res, next){
        try{
            this.isMongoID(req.params.id)
            let post = await Posts.findById(req.params.id);

            if(!post){
               this.error('post is not avaible' , 404);
            }
    
            // delete images
            
            Object.values(post.images).forEach(image =>  fs.unlinkSync(`./public${image}`));
     
            //delete post
            post.deleteOne();
     
            return res.redirect('/admin/panel/manageposts');
        } catch(err){
            next(err);
        }
    }


    async edit(req , res , next){
            try{
                this.isMongoID(req.params.id)
                let post = await Posts.findById(req.params.id);
                if(!post) this.error('چنین پستی وجود ندارد' , 404);
                return res.render('admin/editePost' , {post});
            } catch(err){
                next(err);
            }
    }

    async update(req, res, next){
        try{ 
            let ObjectForUpdate = {};
            let slugFind = await Posts.findById(req.params.id);
            // update image thumb
            ObjectForUpdate.thumb = req.body.imageThumb;
            ObjectForUpdate.slug = this.slug(req.body.code) 
            //check image 
            if(req.file){
                ObjectForUpdate.images = this.imageResize(req.file);
                ObjectForUpdate.thumb = ObjectForUpdate.images[480];
            }

            //update post
            await Posts.findByIdAndUpdate(req.params.id , {$set : {...req.body , ...ObjectForUpdate }})

            delete req.body.images;


            //redirect
            return res.redirect('/admin/panel/manageposts');
        }catch(err){
            next(err);
        }
    }


    imageResize(image){
        const imageInfo = path.parse(image.path);
        
        let addresImages = {};
        addresImages['original'] = this.getUrlImage(`${image.destination}/${image.filename}`);

        const resize = size => {
            let imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;
            
            addresImages[size] = this.getUrlImage(`${image.destination}/${imageName}`);
            
            sharp(image.path)
                .resize(size , null) 
                .toFile(`${image.destination}/${imageName}`);
        }

        [1080 , 720 , 480].map(resize);

        return addresImages;
    }


    getUrlImage(dir){
        return dir.substring(8);
    }


    slug(code){
        return code.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
    }





    
}


module.exports = new PublishController();


