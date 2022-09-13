import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../css/Apply.css'
import { Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Apply({props}) {
    var params = useParams()
    console.log(params)
    const [jobInfo, setJobInfo] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({})
    useEffect(() => {
        var currentJob = (JSON.parse(window.sessionStorage.getItem('current-job')))
        console.log(currentJob)
        
     async function getJob(){
        await axios.get(`https://job-board-nodejs-server-70vpm8n7s-anthonyezeji.vercel.app/jobs/${params.jobId}/${params.title}`).then(res=>{
            const {descriptionArr, jobType,applicationLink} = res.data
          
           setJobInfo({...currentJob,descriptionArr,jobType,applicationLink})
        })
     }
     getJob()

     if(window.sessionStorage.hasOwnProperty('logged-in-user')){
    
        if(JSON.parse(window.sessionStorage.getItem('logged-in-user'))?.hasOwnProperty('email')){
          
          setLoggedIn(true)
          setLoggedInUser(JSON.parse(window.sessionStorage.getItem('logged-in-user')))
        }
        
      }
      
    }, [params])
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

      const notify = (toastString) => toast.success(toastString,{toastId:'success1'});
  return (
    <div className = 'apply'>
        <div className="title">
            <h1>
                {jobInfo.title}
            </h1>
        </div>
        <div className="skills">
            {jobInfo.skillArr?.map((skill,index)=>{
                return(<p>{skill}</p>)
            })}
        </div>
        <div className="info-top">
            
            <div className="location">
                    <h5 style={{margin:0}}>
                        Location
                    </h5>
                    <p style={{margin:0}}>{jobInfo.location}</p>
            </div>
            <div className="company">
            <h5 style={{margin:0}}>Company</h5>
            <p style={{margin:0}}>{jobInfo.company}</p>
            </div>
            <div className="job-type">
                <h5 style={{margin:0}}>
                    Job Type
                </h5>
                <p style={{margin:0}}>{jobInfo.jobType}</p>
            </div>
        
        </div>
        <div style = {{display:'flex'}} className="apply-page-btns">
        <p  id='save-btn' onClick ={handleSaveClick}>Save This Job</p>
      <a target="_blank" id ='apply-btn' href={jobInfo.applicationLink}>
     Go To Application
      </a>
        </div>
        
        <div className="description" style={{width:'75vw'}}>
        {jobInfo.descriptionArr?.map((elem,index)=>{
        
        return(<p key={index} style={{textAlign:'left', margin:5}}>{elem}</p>)
    })}

        </div>
       </div>
  )
}

export default Apply