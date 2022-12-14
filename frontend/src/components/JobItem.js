import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import BusinessIcon from '@mui/icons-material/Business';
import axios from 'axios'
import '../css/Home.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function JobItem({props}) {

  var params = useParams()
    var postDate = new Date(props.time)
    var now = new Date()
    var postedDaysAgo = Math.abs(now-postDate)/(24*60*60*1000)
    var navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({})
  const [onSavedJobsPage, setOnSavedJobsPage] = useState(false)
  const notify = (toastString) => toast.success(toastString,{toastId:'success1'});
  useEffect(() => {
    
    if(window.sessionStorage.hasOwnProperty('logged-in-user')){
    
      if(JSON.parse(window.sessionStorage.getItem('logged-in-user'))?.hasOwnProperty('email')){
        
        setLoggedIn(true)
        setLoggedInUser(JSON.parse(window.sessionStorage.getItem('logged-in-user')))
      }
      
    }
    if(params.hasOwnProperty('email')){
      setOnSavedJobsPage(true)
    }
  }, [])

    async function handleApplyClick(e){
        console.log(e.target.id)
        window.sessionStorage.setItem('current-job',JSON.stringify(props))
        navigate(`${e.target.value}`)
      }
      async function handleSaveClick(){
      
        if(loggedIn){
          console.log(loggedInUser.email)
          await axios.post(`https://job-board-nodejs-server-70vpm8n7s-anthonyezeji.vercel.app/saved-jobs/${loggedInUser.email}`, props).then(res=>{
            if(res.data.hasOwnProperty('message')){
              alert(res.data.message)
            }else{
             notify('Job: ' + res.data.title + ' saved!')
            }
           
          })
        }else{
          alert('Please login to save a job listing.')
        }
         
        
      }
      async function handleUnsaveClick(){
        
          await axios.delete(`https://job-board-nodejs-server-70vpm8n7s-anthonyezeji.vercel.app/saved-jobs/${loggedInUser.email}`, {data:props}).then(res=>{
            window.location.reload(false);
          })
         
       
         
        
      }
  return (
   
    <div className = 'job-list-item'>
   <ToastContainer 
      
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
     
      draggable
    color='red'
      theme='dark'
     
      />
            <h2 style={{ margin:0}}>{props.feautured&&<p style = {{backgroundColor:'rgba(88, 98, 105, 0.877)'}}>FEATURED</p>}{props.title}</h2>
           
            <p style={{color:'white', margin:0}}>{props.company}</p>
            <ul className = 'skill-list'>
            {props.skillArr.slice(0,5).map((skill,index)=>{
              
              return(<li key={index} className = 'skill-item'>{skill}</li>)
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
              {!onSavedJobsPage?<Button onClick={handleSaveClick}>Save</Button>:<Button onClick={handleUnsaveClick}>UNSAVE</Button>}
            <Button value = {props.jobLink} onClick={((e)=>handleApplyClick(e))}>Apply</Button>
            </div>
            </div>
            
           
          </div>
  )
}

export default JobItem