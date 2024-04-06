const controller = require('app/http/Controllers/Controller');
const Posts = require('app/Models/posts');
const User = require('app/Models/user')
const Tickets = require('app/Models/tickets');
const { findByIdAndUpdate } = require('../../Models/tickets');


class PostController extends controller{

    async Bpictures(req , res){


        let query = {};
        if(req.query.search) query.title = new RegExp(req.query.search  , 'gi');
        
        if(req.query.state && req.query.state != 'all') query.address = new RegExp(req.query.state  , 'gi');
        let newestSort = {};
        let randomShow = {};
        

        // return res.json(posts)
        let page = req.query.page || 1;

        if(req.query.filter == 'newest' && req.query.filter != 'all') newestSort =  {page , sort : {createdAt : -1} , limit : 30}
        else randomShow = {page , sort : {updatedAt : 1} , limit : 30}
        
        if(req.query.filter == 'lovely' && req.query.filter != 'all') {
            
        }

        let CPage =  await Posts.paginate({ ...query , $or : [{ title : new RegExp(req.query.search , 'gi') } , {address : new RegExp( req.query.state )}]} , newestSort , randomShow);
        
        
        res.render('home/bill-pics' , {  title : 'گالری سازه ها'  , CPage});
    }

    async single(req , res , next){
        try{
            this.isMongoID(req.params.id)

            let post = await Posts.findById(req.params.id).populate([
                                                            {
                                                                path : 'user' , 
                                                                select : 'name'
                                                            } 
                                                        ]);
                        
            await Posts.findByIdAndUpdate(req.params.id , {$inc : {views : 1}});
            
           

            if(!post) this.error('چنین پستی وجود ندارد' , 404);

            return res.render('home/singlePostPage' , {post});
        } catch(err){
            next(err);
        }
}


    async ticketFormShow(req, res, next){
        try{
            return res.render('home/tickets', {title : 'ارسال تیکت و تماس با مدیریت'})
        }catch(err){

        }
    }

    async like(req , res , next){

        let id = await Posts.findById(req.params.id);      
        await Posts.findOneAndUpdate(id , {$inc : {likes : 1}} )


        return this.back(req , res)
    }
    async comment(req , res , next){
        try{
            let status = await this.validationData(req);
            if(!status) return this.back(req , res)

            let newTickets = new Tickets({
                user : req.user.id , 
                title : req.body.title ,
                ...req.body
            });
            newTickets.approved = false;
            await newTickets.save();

            return this.back(req , res);
        } catch(err){
            next(err);
        }
    }

}
module.exports = new PostController();