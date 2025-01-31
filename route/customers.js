const express=require('express')
const router=express.Router();
const {Customer,validate} =require('../models/customer')
const auth=require('../middleware/auth')
const mongoose =require('mongoose')


router.get('/:id',async (req,res)=>{
    const customers=await Customer.findById(req.params.id)

    if(!customers) return res.status(404).send('Customer with the given ID was not found');
    res.send(customers)
})
router.get('/',async (req,res)=>{
    res.send(await Customer.find().sort('name'))
})

router.put('/:id',auth,async (req,res)=>{
    const {error}= validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    const customers=await Customer.findByIdAndUpdate(req.params.id,{name:req.body.name, },{new: true},);
    if(!customers) return res.status(404).send('Customer with the given ID was not found');
    
    res.send(customers)
    
})

router.post('/',auth,async (req,res)=>{
    const {error}= validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    let customers=new Customer({
        name:req.body.name,
        isGold:req.body.isGold,
        phone: req.body.phone
    })
    customer=await customer.save();
    
    res.send(customers)

})

router.delete('/:id',auth,async(req,res)=>{
    const customer=await Customer.findByIdAndDelete(req.params.id)

    if(!customer) return res.status(404).send('Customer with the given ID was not found');

    res.send(customer)

})



module.exports= router