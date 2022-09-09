import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import BusinessIcon from '@mui/icons-material/Business';
import '../css/Home.css'
function JobItem({props}) {
    var postDate = new Date(props.time)
    var now = new Date()
    var postedDaysAgo = Math.abs(now-postDate)/(24*60*60*1000)
    var navigate = useNavigate()
    async function handleApplyClick(e){
        console.log(e.target.id)
        window.sessionStorage.setItem('current-job',JSON.stringify(props))
        navigate(`${e.target.value}`)
      }
  return (
   
    <div className = 'job-list-item'>
            <h2>{props.title}</h2>
            <ul className = 'skill-list'>
            {props.skillArr.slice(0,5).map(skill=>{
              
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
              <h3 style={{color:'white'}}>{props.location}</h3>
            </div>
            <div className='job-item-btns'>
              <Button>Save</Button>
            <Button value = {props.jobLink} onClick={((e)=>handleApplyClick(e))}>Apply</Button>
            </div>
            </div>
            
           
          </div>
  )
}

export default JobItem