const path= require('path')
const autobind = require('auto-bind');
const passport = require('passport');
const User = require('app/Models/user')
const moment = require('moment-jalali');
moment.loadPersian({dialect: 'persian-modern'})

module.exports = class Helpers {
    
        constructor(req , res) {
            autobind(this);
            this.req = req;
            this.res = res;
            this.keep_Data = req.flash('keepData')[0];
        }
    
    
        getObject() {
            return {
                auth : this.auth(),
                viewPath : this.viewPath,
                ...this.getVariblesObj() , 
                old : this.old ,
                date : this.date ,
                req : this.req 
            }
        }
    

        auth() {
            return {
                check : this.req.isAuthenticated(),
                user : this.req.user ,
            }
        }

        viewPath(dir) {
            let vp = path.resolve('./resource/views');
            return path.resolve(vp + '/' + dir);
        }
        getVariblesObj(){
            return{
                errors : this.req.flash('errors')
            }
        }
        old(field , defualtValue = ''){
            return this.keep_Data && this.keep_Data.hasOwnProperty(field) ? this.keep_Data[field] : defualtValue;

        }
        date(time){
            return moment(time);
        }
}