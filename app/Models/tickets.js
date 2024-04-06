const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MongoosePaginate = require('mongoose-paginate');

const TicketsSchema = new Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'} , 
    parent : {type : Schema.Types.ObjectId , ref : 'Comment' , default : null},
    approved : { type : Boolean , default : false} ,
    title : {type : String , require : true} , 
    comment : { type : String , require : true } ,
    reply : {type : String , require : true}
} , { timestamps : true });


TicketsSchema.plugin(MongoosePaginate);


module.exports =  mongoose.model('Tickets' , TicketsSchema);