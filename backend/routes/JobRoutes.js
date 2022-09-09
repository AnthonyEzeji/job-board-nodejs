const { default: axios } = require('axios')
const express = require('express')
const Jobs = require('../controllers/getJobs')
const cheerio = require('cheerio')


var router = express.Router()

router.get('/:skill/:country/:remote/:language', async (req,res)=>{

    jobSearch = new Jobs()
    if(req.query.hasOwnProperty('skip')){
     
  jobSearch.getJobs(`${process.env.URL}${'jobs/'}${req.params.skill}/${req.params.country}/${req.params.remote}/${req.params.language}?skip=${req.query.skip}&limit=20`).then(jobs=>{

        res.send(jobs)
    })
    }else{
      
        jobSearch.getJobs(`${process.env.URL}${'jobs/'}${req.params.skill}/${req.params.country}/${req.params.remote}/${req.params.language}`).then(jobs=>{
           
            res.send(jobs)
        })
    }
    
    

})

router.get('/:jobId/:title', async (req,res)=>{

  const jobSearch = new Jobs()

const {jobType,descriptionArr,applicationLink} = await jobSearch.getSpecificJob(`${process.env.URL}${'job/'}${req.params.jobId}/${req.params.title}`)
res.send({jobType,descriptionArr,applicationLink})
})



module.exports = router