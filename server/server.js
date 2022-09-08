const express = require('express')
const jobRoutes = require('../server/JobRoutes')
require('dotenv').config()

const cors = require('cors')
var app = express()
app.use(cors(), express.json())
app.use('/jobs', jobRoutes)

app.listen(5000, ()=>{
    console.log('server running on 5000')
})