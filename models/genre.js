
const Joi=require('joi')
const mongoose =require('mongoose')

// const genres =[
//     {id:1 ,name:'action'},
//     {id:2 ,name:'comedy'},
//     {id:3 ,name:'drama'}
// ];

const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
})
const Genre = mongoose.model('Genre',genreSchema)


// validate
function validateGenre(genre){
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    })
    return schema.validate(genre)
}



exports.genreSchema = genreSchema;
exports.Genre = Genre; 
exports.validate = validateGenre;