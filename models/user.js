const Joi=require('joi')
const config=require('config')
const mongoose =require('mongoose')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    },
    isAdmin:Boolean
})

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this.id,isAdmin:this.isAdmin},config.get('jwtprivatekey'))
}

const User=mongoose.model('user',userSchema);

function validateUser(user){
    const schema=Joi.object({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    })
    return schema.validate(user)
}


exports.validate=validateUser
exports.User=User