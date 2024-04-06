const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/user');

// Dependencies source code

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(user=> {
    done(null, user);
  });
});






passport.use('local.register', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  let user = await User.findOne({ 'username': username });
  if (user) {
    done(null, false, req.flash('errors', 'چنین کاربری قبلا در سایت ثبت نام کرده است'));
  } else {

      const newUser = new User({
        name: req.body.name,
        username,
        phone : req.body.phone , 
        email: req.body.email,
        password
      });
        newUser.save()
        done(null , newUser);     
    }
}));






passport.use('local.login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, (req, username, password, done) => {

  User.findOne({ 'username': username }).then((user , err) => {
    if(err) return done(err);
    if (!user || !user.comparePassword(password)) {
      return done(null, false, req.flash('errors', 'چنین کاربری وجود ندارد!'));
    }
    // console.log(auth.check);
      return done(null, user);

  })
  .catch(err => done(err))

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
