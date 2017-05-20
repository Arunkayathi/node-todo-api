var mongoose=require('mongoose');
var todoSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    completed:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now},
    completedAt:{
        type: Number,
        default: null
    }
});

var Todo=mongoose.model('Todo',todoSchema);

module.exports={Todo};
