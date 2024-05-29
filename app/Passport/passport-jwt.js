const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../Models/user');

// Dependencies source code
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;


// JWT strategy
passport.use('jwt', new JWTStrategy({
  
  
  jwtFromRequest : ExtractJWT.fromExtractors([
    ExtractJWT.fromUrlQueryParameter('api_token')
  ]) , 


  secretOrKey : 'gq@g#/1fag3gdhkutl5bfa'
} ,  async (jwtPayload , done) => {

  try{
    let user = await User.findById(jwtPayload.id);

    if(user) done(null , user);
    else done(null , false , {message : ' شما به لینک دسترسی ندارید'})
  }catch(err){
    done(null , false , {message : err.message})
  }
  
}))




















// passport.use('local.register' , new localStrategy({
//   usernameField : 'email',
//   passwordField : 'password',
//   passReqToCallback : true
// } , (req , email ,  password , done) => {
//   User.findOne({ 'email' : email } , (err , user) => {
//       if(err) return done(err);
//       if(user) return done(null , false , req.flash('errors' , 'چنین کاربری قبلا در سایت ثبت نام کرده است'));

      
//       const newUser = new User({
//           name : req.body.name,
//           email,
//           password
//       });

//       newUser.save(err => {
//           if(err) return done(err , false , req.flash('errors' , 'ثبت نام با موفقیت انجام نشد لطفا دوباره سعی کنید'));
//           done(null , newUser);
//       })

//   })
// }))
