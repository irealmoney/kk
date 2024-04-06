const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
const MongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

const PermissionSchema = new Schema({

    name : {type : String , required : true} , 
    lable : {type : String , required : true}

} , { timestamps : true , toJSON : { virtuals : true } });

PermissionSchema.plugin(MongoosePaginate);


PermissionSchema.virtual('roles' , {
    ref : 'Role' , 
    localField : '_id' , 
    foreignField : 'permissions'
})

module.exports =  mongoose.model('Permission' , PermissionSchema);