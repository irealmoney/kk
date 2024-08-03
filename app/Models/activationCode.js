const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
const Schema = mongoose.Schema;


const activationCode = Schema({

    user : {type : Schema.Types.ObjectId , ref : 'User' , required : true} ,
    code : {type : String , required : true} , 
    use : {type : Boolean , default : false},
    expire : {type : Date  , required : true} 
} , { timestamps : true });




module.exports =  mongoose.model('ActivationCode' , activationCode);