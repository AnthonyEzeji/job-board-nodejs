import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import JobItem from '../components/JobItem'
import '../css/SavedJobs.css'
import NavBar from '../components/NavBar'
import { set } from 'mongoose'

function SavedJobs() {
    var params = useParams()
    const [savedJobs, setSavedJobs] = useState([])
    const [loggedInUser, setloggedInUser] = useState({})
  
    useEffect(() => {
        setloggedInUser(JSON.parse(window.sessionStorage.getItem('logged-in-user')))
   async function getSavedJobs(){
    try {
        await axios.get(`http://localhost:5000/saved-jobs/${params.email}`).then(res=>{
        setSavedJobs(res.data)
    })
    } catch (error) {
        console.log(error)
    }
    
   }getSavedJobs()
    }, [])
    console.log(savedJobs)
  return (
    <div className='saved-jobs'>
        <NavBar/>
        <h3 style={{color:'rgb(240, 209, 36)'}}>{loggedInUser.firstName}'s $aved Jobs</h3>
        {savedJobs.length>0?<ul className = 'job-list' s>{savedJobs.map((job,index)=>{
        return(<JobItem props = {job}></JobItem>)
    })}</ul>:<h1>No Saved Jobs</h1>
    }
        

    </div>
  )
}

export default SavedJobs