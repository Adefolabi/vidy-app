const express=require('express')
const auth=require('../middleware/auth')
const admin=require('../middleware/admin')
const router=express.Router();
const {Genre, validate} = require('../models/genre');
const mongoose =require('mongoose')




// GET a single genre using id
router.get('/:id',async (req,res)=>{
    const genre=await Genre.findById(req.params.id)

    if(!genre) return res.status(404).send('Genre with the given ID was not found');
    res.send(genre)
})
router.get('/',async (req,res)=>{
    res.send(await Genre.find().sort('name'))

    res.status(500).send('something failed')
})

router.put('/:id',auth,async (req,res)=>{
    const {error}= validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const genre=await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name, },{new: true},);

    if(!genre) return res.status(404).send('Genre with the given ID was not found');
    
    res.send(genre)
    
})

router.post('/',auth,async (req,res)=>{

    const {error}= validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    let genre=new Genre({
        name:req.body.name
    })
    genre=await genre.save();
    
    res.send(genre)

})

router.delete('/:id',[auth,admin],async(req,res)=>{
    const genre=await Genre.findByIdAndDelete(req.params.id)

    if(!genre) return res.status(404).send('Genre with the given ID was not found');

    res.send(genre)

})




// // create genre
// async function createGenre(name){
//     const genre=new Genre({
//         name:name
//     })
//     try{
//         const result=await genre.save()
//         console.log(result)
//         return result
//     }
//     catch(ex){
//         for(field in ex.error){
//             console.log(ex.error[field].message)
//         }
//     }
// }
// // get genres
// async function getGenres(id){
//     const genres=await Genre.find({id:id})
// }
module.exports=router