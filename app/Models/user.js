const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
const MongoosePaginate = require('mongoose-paginate');

const UserSchema = Schema({
    name : { type : String , required : true } , 
    admin : { type : Boolean , default : 0 } , 
    roles : [{type : Schema.Types.ObjectId , ref : 'Role'}] ,
    username : { type : String , unique : true , require : true} ,
    email : {type : String , required : true} ,
    phone : {type : Number , require : true} ,
    password : { type : String , required : true } ,
    rememberToken : { type: String , default : null} 
    
} , { timestamps : true , toJSON : { virtuals : true }});

UserSchema.plugin(MongoosePaginate);

UserSchema.pre('save' , function(next){

    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();


    let salt = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(this.password , salt)

    this.password = hash;
    next();

})




UserSchema.pre('findOneAndUpdate' , function(next){

    let salt = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(this.getUpdate().$set.password , salt);

    this.getUpdate().$set.password = hash;
    next();

})




UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password , this.password);
}


UserSchema.methods.hasRole = function(roles){

    let result = roles.filter(role =>{
        return this.roles.indexOf(role) > -1;
    })

    return !! result.length;

}

UserSchema.methods.setRememberToken = async function(res){
      const token = uniqueString();
      res.cookie('remember_Token' , token , {maxAge : 1000 * 60 * 60 * 24 * 10 , httpOnle : true , signed : true})
      await this.updateOne({rememberToken : token})

}


UserSchema.virtual('posts' , {
    ref : 'Posts' , 
    localField : '_id' , 
    foreignField : 'user'
})


UserSchema.virtual('tickets' , {
    ref : 'Tickets' , 
    localField : '_id' , 
    foreignField : 'user'
})

module.exports = mongoose.model('User' , UserSchema);