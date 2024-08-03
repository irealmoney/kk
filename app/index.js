const express = require('express');
const app = express();
const http = require('http')
const path = require('path')
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const flash = require('connect-flash');
const mongoose = require('mongoose');
const passport = require('passport');
const { check } = require('express-validator/check');
const Helpers = require('./helper');
const rememberLogin = require('app/http/Middleware/RememberLogin');
const expressLayouts = require('express-ejs-layouts');
const helmet = require('helmet')
var methodOverride = require('method-override')
const gate = require('app/helpers/gate')
const csrf = require('csurf');

const expressLimit = require('express-rate-limit')
const ApiLimiter = new expressLimit({
    windowMs : 1000 * 60 * 3 , 
    max : 180 , 
    handler : function(req , res){
        res.json({
            data : 'به دلیل درخواست های تکراری اطلاعات شما تا 5 دقیقه ارسال نمیشود' ,
            status : 'error'
        })
    }

})
// csrf handler 
const csrfErrorHandler = require('app/http/middleware/csrfErrorHandler');
const { handler } = require('./http/Middleware/ErrorHandler');


//Active Users Midlleware
const activeUser = require('app/http/middleware/activeUser');

// // "app-module-path": "^2.2.0",
// // "auto-bind": "^1.2.0",
// // "bcrypt": "^5.1.1",
// // "body-parser": "^1.18.2",
// // "connect-flash": "^0.1.1",
// // "connect-mongo": "^5.0.0",
// // "cookie-parser": "^1.4.3",
// // "ejs": "^2.5.9",
// // "express": "^4.18.2",
// // "express-recaptcha": "^5.1.0",
// // "express-session": "^1.15.6",
// // "express-validator": "^5.2.0",
// // "mongoose": "^7.6.1",
// // "passport": "^0.4.1",
// // "passport-local": "^1.0.0",
// // "react": "^18.2.0",
// // "react-toastify": "^9.1.3",
// // "unique-string": "^1.0.0"
// // "express-ejs-layouts": "^2.5.1",



module.exports = class Application {
    constructor() {
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();
    }

    setupExpress(){
        const server = http.createServer(app);
        server.listen(8080 , ()=>console.log('local on 8080 ...'));
    }

    setMongoConnection(){
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://127.0.0.1:27017/maagency')
            
    }

    /**
     * Express Config
     */
    setConfig() {
        require('./Passport/passport-local');
        require('./Passport/passport-jwt');
        app.use(express.static('public'));
        app.set('view engine' , 'ejs');
        app.set('views' , path.resolve('./resource/views'));
        //express layout config
        app.use(expressLayouts);
        app.set('layout extreactScripts', true);
        app.set('layout extreactStyle', true);
        app.set("layout" , 'home/master')

        app.use(
            helmet({
       contentSecurityPolicy: false,
        crossOriginResourcePolicy: false,
        crossOriginEmbedderPolicy: false,
            }));
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended : true }));
        app.use(session({
            name : 'ma_Ads' ,
            secret : 'arashmorad65' , 
            resave  : true , 
            saveUninitialized : true , 
            cookie : {expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 10 )},
            store :  MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/maagency', useNewUrlParser: true , useUnifiedTopology: true  })
        }))
        app.use(cookieparser('arashmorad65'));
        app.use(flash());
        app.use(validator());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(rememberLogin.handle);
        app.use(methodOverride('_method'))
        app.use((req , res , next) => {
        app.locals = new Helpers(req, res).getObject();
        next();
        });
        app.use(gate.middleware());
        app.use(ApiLimiter);
    }



    setRouters() {
        app.use(activeUser.handle)
        app.use(require('app/Routs/Api/index'));
        app.use(csrf({cookie : true}) , require('app/Routs/Web/mainRout'));  
        app.use(csrfErrorHandler.handle) 

    }
}
