const express = require('express')
const jobRoutes = require('./routes/JobRoutes')
const savedJobRoutes = require('./routes/SavedJobRoutes')
require('dotenv').config()
const mongoose = require('mongoose')
const db  = mongoose.connect(process.env.DB, ()=>{
    console.log('successfully connected to database...')
})
const userRoutes = require('./routes/UserRoutes')
const cors = require('cors')
var app = express()

app.use(cors({origin: '*'}), express.json())

app.use('/jobs', jobRoutes)
app.use('/saved-jobs', savedJobRoutes)
app.use('/users',userRoutes)
app.listen(5000, ()=>{
    console.log('server running on 5000')
})