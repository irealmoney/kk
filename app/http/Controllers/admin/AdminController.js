const controller = require('app/http/Controllers/Controller')
const passport = require('passport')
const {checkBody , GetValidationResult} = require('express-validator')
const Posts = require('app/Models/posts');


class adminController extends controller{
    
    adminDashboardshow(req ,res){
        const title = 'Ma Agency | پنل ادمین';
        res.render('admin/Status' );

    }

}

module.exports = new adminController();


// <% if(errros.length > 0){ %>
//     <% errors.forEach(error =>{ %>

//         <%= error %><br>

//     <% })  %>
// <% } %>