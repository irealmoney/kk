const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MongoosePaginate = require('mongoose-paginate');

const PostSchema = new Schema({
    user : {type : Schema.Types.ObjectId , ref : 'User'} , 
    title : { type : String , require : true } ,
    slug : { type : String , require : true } ,
    type : { type : String , require : true } ,
    status : { type : String , require : true } ,
    images : { type : Object , require : true } ,
    width : {type : Number , require : true } ,
    height : {type : Number , require : true } ,
    thumb : { type : String , require : true } ,
    address : { type : String , require : true } ,
    location : { type : String , require : true } ,
    code : { type : String , require : true } ,
    tags : { type : String , require : true } ,
    date : { type : String , default : 0 } ,
    views : { type : Number , default : 0 } ,
    likes : { type : Number , default : 0 } 

} , { timestamps : true , toJSON : { virtuals : true } });


PostSchema.plugin(MongoosePaginate);

PostSchema.methods.path = function() {
    return `/pics/${this.id}`;
}


PostSchema.methods.typeOfPosts = function(){
    switch(this.type){
        case 'استوری برد' :
            return 'استوری برد'
        break;
        case 'بیلبورد' :
            return 'بیلبورد'
        break;
        case 'عرشه پل' :
            return 'عرشه پل'
        break;
        default : 'بدون تایپ'
    }
}




PostSchema.methods.statusValue = function(){
    switch(this.status){
        case 'قابل اکران' :
            return 'قابل اکران'
        break;
        case 'در حال اکران' :
            return 'در حال اکران' 
        break;
        default : 'بدون تایپ'
    }
}



PostSchema.methods.inc = async function(field , count = 1){
    this[field] += count ; 
    await this.save();
}




module.exports =  mongoose.model('Posts' , PostSchema);