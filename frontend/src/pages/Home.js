import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Button, MenuItem, Select} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import SelectInput from '@mui/material/Select/SelectInput'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import '../css/Home.css'
import BusinessIcon from '@mui/icons-material/Business';
function Home() {
  var navigate = useNavigate()
  var params = useParams()
  const queryParams = new URLSearchParams(window.location.search)
  
    const [jobs, setJobs] = useState([])
    const [skill,setSkill] = useState(params.hasOwnProperty('skill')?params.skill:'all')
    const [country,setCountry] = useState(params.hasOwnProperty('country')?params.country:'all')
    const [remote,setRemote] = useState(params.hasOwnProperty('remote')?params.remote:'all')
    const [language,setLanguage] = useState(params.hasOwnProperty('language')?params.language:'all')
    const [skip,setSkip] = useState(queryParams.get('skip')==null?0:queryParams.get('skip'))
    
    useEffect(() => {

        async function getJobs(){
         
          navigate(`/${skill}/${country}/${remote}/${language}`)
 
            await axios.get(`http://localhost:5000/jobs/${skill}/${country}/${remote}/${language}`).then(res=>{
              console.log(res.data)
              setJobs(res.data)
            })
          
            
        }
      getJobs()
    }, [skill,country,remote,language,skip])
    function handleChange(e){
      
      console.log(e.target.name)
switch (e.target.name) {
  case 'skill':
    setSkill(e.target.value)
    break;
    case 'country':
      setCountry(e.target.value)
      break;
      case 'remote':
    setRemote(e.target.value)
    break;
    case 'language':
    setLanguage(e.target.value)
    break;
  default:
    break;
}
    }
    useEffect(() => {
     console.log('Skill:'+skill + " country: "+ country + " remote: " + remote + ' language: ' + language)
    }, [skill,country,remote,language])

    async function handleApplyClick(e){
      console.log(e.target.id)
      window.sessionStorage.setItem('current-job',JSON.stringify(jobs[e.target.id]))
      navigate(`${e.target.value}`)
    }
  return (
    <div className = 'home'>
      
      <div className='selector'>
      <h5>Skill</h5>
        <Select
    
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={skill}
          defaultValue={skill}
          label="Skill"
          name = 'skill'
          onChange={(e)=>handleChange(e)}
        >
          <li className = 'select-item' value = 'python'>Python</li>
        </Select>
        <h5>Country</h5>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          defaultValue={country}
          label="Country"
          name = 'country'
          onChange={(e)=>handleChange(e)}
        >
          <li className = 'select-item' value = 'Austria'>Austria</li>
        </Select>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={remote}
          defaultValue={remote}
          label="remote"
          name = 'remote'
          onChange={(e)=>handleChange(e)}
        >
          <li className = 'select-item' value = 'remote'>Remote</li>
        </Select>
        <Select
        
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          defaultValue={language}
          label="Language"
          name = 'language'
          onChange={(e)=>handleChange(e)}
        >
          <li className = 'select-item'  value = 'en'>English</li>
        </Select>
        <Button onClick = {()=>navigate(`/jobs/${skill}/${country}/${remote}/${language}`)}>search</Button>
      </div>
      <ul  className = 'job-list'>
        {jobs.map((job,index)=>{
          var postDate = new Date(job.time)
          var now = new Date()
          var postedDaysAgo = Math.abs(now-postDate)/(24*60*60*1000)
          return(
          <div className = 'job-list-item'>
            <h2>{job.title}</h2>
            <ul className = 'skill-list'>
            {job.skillArr.slice(0,5).map(skill=>{
              
              return(<li className = 'skill-item'>{skill}</li>)
            })}
            </ul>
            <div className="job-list-item-bottom">
              <div className="job-posted">
                <AccessAlarmIcon/>
                <h3 style={{color:'white'}}>{postedDaysAgo<1?'Today':Math.floor(postedDaysAgo)+' day(s) ago'} </h3>
                
              </div>
            <div className = 'job-location'>
              <BusinessIcon/>
              <h3 style={{color:'white'}}>{job.location}</h3>
            </div>
            <div className='job-item-btns'>
              <Button>Save</Button>
            <Button id = {index} value = {job.jobLink} onClick={((e)=>handleApplyClick(e))}>Apply</Button>
            </div>
            </div>
            
           
          </div>)
        })}
      </ul>
      
    </div>
  )
}

export default Home