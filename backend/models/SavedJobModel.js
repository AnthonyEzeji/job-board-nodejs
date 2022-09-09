const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title : {
        type:String,
        required:true
    },jobLink: {
        type:String,
        required:true
    },
    company: {
        type:String,
        required:true
    }
    ,skillArr : {
        type:Array,
        required:true
    },location:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        required:true
    },email:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('saved jobs', schema)