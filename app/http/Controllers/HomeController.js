const controller = require('app/http/Controllers/Controller');
const Posts = require('app/Models/posts');
const User = require('app/Models/user')
const { createSitemap } = require('sitemap');
const RSS = require('rss');

class homeController extends controller{
    async index(req , res){
        let CPage = await Posts.paginate({},{ sort : {createdAt : -1} , limit : 6});
        const title = 'Ma Agency | صفحه اصلی';
        res.render('home/index' , {title , CPage});
    }

    ListPortal(req , res){
        res.render('home/lists-portal');
    }


    async sitemap(req , res , next){
        try{


            const sitemap = createSitemap({
                hostname : 'https://localhost:8080' , 
                cacheTime : 600000 
            })

            sitemap.add({ url : '/',  changefreq : 'daily', priority: 1 });
            sitemap.add({ url : '/pics', priority: 1 });


            let posts = await Posts.find({ }).sort({createdAt : -1}).exec();
            posts.forEach(post => { sitemap.add({ url : post.path() ,  changefreq : 'daily', priority: 0.8 }) });
            

            const xml = sitemap.toXML()
            res.header('Content-Type', 'application/xml');
            res.send( xml );

        }catch(err){
            next(err);
        }
    }







    async feedPosts(req , res , next){
        try{


            let feed = new RSS({
                title : 'فید خوان پست های آژانس تبلیغاتی ما' , 
                description : 'سازه های جدید را ازطریق rss ببینید' ,
                feed_url : `https://localhost:8080/feed/pics` ,
                site_url : `https://localhost:8080`
            })


            let posts = await Posts.find({ }).populate('user').sort({createdAt : -1}).exec();
            posts.forEach(post => {
                 feed.item({
                    title : post.title , 
                    description : post.address, 
                    date : post.createdAt , 
                    url : post.path() ,
                    author : post.user
                }) 
                });
            
                const xml = feed.xml()
                res.header('Content-type', 'application/xml');
                res.send( xml );


        }catch(err){
            next(err);
        }            
    }






}
module.exports = new homeController();