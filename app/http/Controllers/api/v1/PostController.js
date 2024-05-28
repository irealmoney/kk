const controller = require('app/http/Controllers/api/Controller');
const Posts = require('app/Models/posts');


class PostController extends controller{


async Posts(req , res , next){
    try{
        let page = req.query.page || 1;
        let CPage = await Posts.paginate({},{page , sort : {createdAt : -1} , limit : 10});

        res.json({
            data : CPage ,
            status : 'success'
        })

    }catch(err){
        // console.log(err.message)
        this.failed(err.message , res);
    }
}

async singlePost(req , res , next){
    try{


        let post = await Posts.findByIdAndUpdate(req.params.post).populate([
                                                        {
                                                            path : 'user' , 
                                                            select : 'name'
                                                        } 
                                                    ]);
                    
        await Posts.findByIdAndUpdate(req.params.id , {$inc : {views : 1}});
        
       

        if(!post) this.failed('چنین پستی وجود ندارد' , res , 404);

        res.json({
            data : post ,
            status : 'success'
        })

    } catch(err){
        this.failed(err.message , res);
    }
}


}
module.exports = new PostController();