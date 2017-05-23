const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
var userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        unique:true,
        lowercase:true,
        validate: {
            validator: (value)=>{
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});
userSchema.methods.toJSON=function(){
var user=this;
var userObject=user.toObject();
return _.pick(userObject,['_id','email']);
};
userSchema.methods.generateAuthToken= function(){
    var user=this;
    var access='auth';
    var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    user.tokens.push({access,token});
    return user.save().then(()=>{
        return token;
    });
};
userSchema.statics.findByToken=function(token){
    var user=this;
    var decoded;

    try{
    decoded=jwt.verify(token,'abc123');
    }catch(e){
        return Promise.reject();
    }
    return user.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};
var User=mongoose.model('Users',userSchema);
module.exports={User};
