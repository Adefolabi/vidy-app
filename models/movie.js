const Joi=require('joi');
const mongoose =require('mongoose');
const{genreSchema}=require('./genre')

const Movie=mongoose.model('movies',new mongoose.Schema({
    title:{
        type:String,
        minlenght:4,
        maxlength:50,
        required:true
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true
    },
    dailyRentalRate:{
        type:Number,
        required:true
    }
}))



// validate
function validateMovie(movie){
    const schema = Joi.object({
        title:Joi.string().min(3).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    })
    return schema.validate(movie)
}


exports.Movie=Movie
exports.validate=validateMovie
