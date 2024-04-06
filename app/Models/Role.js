const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
const MongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

const RoleSchema = new Schema({

    name : {type : String , required : true} , 
    lable : {type : String , required : true}, 
    permissions : [{ type : Schema.Types.ObjectId , ref : 'Permission' }]

} , { timestamps : true , toJSON : { virtuals : true } });

RoleSchema.plugin(MongoosePaginate);


module.exports =  mongoose.model('Role' , RoleSchema);