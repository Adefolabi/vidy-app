const express = require('express')
const winston =require('winston')
const error=require('./middleware/error')
require('express-async-errors')
const app = express()
const config=require('config')
const genre=require('./route/genres')
const auth =require('./route/auth')
const customers=require('./route/customers')
const movies=require('./route/movies')
const rentals=require('./route/rentals')
const Users =require('./route/users')
const mongoose = require('mongoose')

app.use(express.json())
app.use('/api/genres',genre)
app.use('/api/customer',customers)
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users',Users)
app.use('/api/auth',auth)

app.use(error)

if(!config.get('jwtprivatekey')){
    console.error('FATAL ERROR: jwtprivatekey is not defined')
    process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly-app')
.then(()=> console.log('connected to mongodb'))
.catch(err=>console.error('couldnot connect to mongodb...'));

// event listener
const port=process.env.PORT || 8080
app.listen(port,()=> console.log(' 8080'));