const Joi=require('joi')
const mongoose =require('mongoose')

const customerSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    isGold:{
        type:String,
        default:false
    },
    phone:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
});

const Customers= mongoose.model('Customer',customerSchema);

// validate
function validateCustomer(customer){
    const schema = Joi.object({
        name:Joi.string().min(5).required(),
        isGold:Joi.boolean().required(),
        phone:Joi.string().min(6).required()
    })
    return schema.validate(customer)
}

exports.Customer =Customers;
exports.validate=validateCustomer;