var mongoose=require('mongoose');
var userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        min:3
    }
});
var User=mongoose.model('Users',userSchema);
module.exports={User};
