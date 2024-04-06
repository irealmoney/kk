const controller = require('app/http/Controllers/Controller')
const Posts = require('app/Models/posts');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');




class ManagementController extends controller{
    
    async showPanel(req ,res){
        let page = req.query.page || 1;
        let CPage = await Posts.paginate({},{page , sort : {createdAt : -1} , limit : 10});
        res.render('admin/Manage', { title : 'مدیریت سایت'  , CPage} );

    }


    








}

module.exports = new ManagementController();
