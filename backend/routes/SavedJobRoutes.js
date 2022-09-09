const { default: axios } = require('axios')
const express = require('express')
const Jobs = require('../controllers/getJobs')
const cheerio = require('cheerio')
const savedJobModel = require('../models/SavedJobModel')

var router = express.Router()

router.post('/:email',async(req,res)=>{
    try {

        await savedJobModel.findOne({jobLink:req.body.jobLink, email:req.params.email}).then(doc=>{
            if(doc){
                res.send({message:'Job already saved!'})
             
            }else{
                savedJobModel.create({...req.body,email:req.params.email}).then(doc=>{
                    res.send(doc)
                })
            }
        })
       
    } catch (err) {
      
    }
   })
   router.get('/:email',async(req,res)=>{
    
       try {
          await savedJobModel.find({email:req.params.email}).then(docs=>{
           res.send(docs)
              
          })
       } catch (err) {
         
       }
      })
      router.delete('/:email',async(req,res)=>{
       
        try {
           await savedJobModel.findByIdAndDelete(req.body._id).then(doc=>{
            res.send(doc)
               
           })
        } catch (err) {
          
        }
       })

      module.exports = router