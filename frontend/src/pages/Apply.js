import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../css/Apply.css'
function Apply({props}) {
    var params = useParams()
    console.log(params)
    const [jobInfo, setJobInfo] = useState([])
    useEffect(() => {
        var currentJob = (JSON.parse(window.sessionStorage.getItem('current-job')))
        console.log(currentJob)
        
     async function getJob(){
        await axios.get(`http://3.87.187.44:5000/jobs/${params.jobId}/${params.title}`).then(res=>{
            const {descriptionArr, jobType,applicationLink} = res.data
          
           setJobInfo({...currentJob,descriptionArr,jobType,applicationLink})
        })
     }
     getJob()
    }, [params])
    console.log(jobInfo)
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
      <a target="_blank" id ='apply-btn' href={jobInfo.applicationLink}>
        Apply For This Job
      </a>
        <div className="description" style={{width:'75vw'}}>
        {jobInfo.descriptionArr?.map((elem,index)=>{
        
        return(<p key={index} style={{textAlign:'left', margin:5}}>{elem}</p>)
    })}

        </div>
       </div>
  )
}

export default Apply