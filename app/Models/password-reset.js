const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
var Schema = mongoose.Schema;

const PasswordReset = new Schema({

    email : {type : String , required : true} , 
    token : {type : String , required : true} , 
    used : {type : Boolean , default : false}

} , { timestamps : {updatedAt : false} });




module.exports =  mongoose.model('PReset' , PasswordReset);