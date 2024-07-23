const express=require('express')
const router=express.Router();
const {Movie,validate} =require('../models/movie')
const auth=require('../middleware/auth')
const {Genre}=require('../models/genre')
const mongoose =require('mongoose')


router.get('/:id',async (req,res)=>{
    const customers=await Movie.findById(req.params.id)

    if(!customers) return res.status(404).send('Customer with the given ID was not found');
    res.send(customers)
})
router.get('/',async (req,res)=>{
    res.send(await Movie.find().sort('name'))
})

router.put('/:id',auth,async (req,res)=>{
    const {error}= validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    
    const movie=await Movie.findByIdAndUpdate(req.params.id,{
        title:req.body.title, 
        numberInStock: req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    },{new: true},);
    if(!movie) return res.status(404).send('Movie with the given ID was not found');
    
    res.send(movie)
    
})

router.post('/',auth,async (req,res)=>{
    const {error}= validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    let movies=new Movie({
        title:req.body.title,
        genre:{  _id: genre._id,
            name: genre.name},
        numberInStock: req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    })
    movies=await movies.save();
    
    res.send(movies)

})

router.delete('/:id',auth,async(req,res)=>{
    const customer=await Customer.findByIdAndDelete(req.params.id)

    if(!customer) return res.status(404).send('Customer with the given ID was not found');

    res.send(customer)

})



module.exports= router