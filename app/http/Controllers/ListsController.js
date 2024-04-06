const controller = require('app/http/Controllers/Controller');



class ListsController extends controller{

    ListPortal(req , res){
        res.render('home/lists-portal');
    }
    // ListPage(req ,res){

    // }
}
module.exports = new ListsController();