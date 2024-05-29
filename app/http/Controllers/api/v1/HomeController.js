const controller = require('app/http/Controllers/api/Controller');
const Posts = require('app/Models/posts');
const passport = require('passport')
const jwt = require('jsonwebtoken')
class HomeController extends controller{

    async user(req ,res){

        res.json(req.user)

    }
}
module.exports = new HomeController();