import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Button, MenuItem, Select} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import SelectInput from '@mui/material/Select/SelectInput'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import '../css/Home.css'
import BusinessIcon from '@mui/icons-material/Business';
import JobItem from '../components/JobItem'
import NavBar from '../components/NavBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          setSkip(0)
            await axios.get(`http://https://job-board-nodejs-server-70vpm8n7s-anthonyezeji.vercel.app//jobs/${skill}/${country}/${remote}/${language}`).then(res=>{
              console.log(res.data)
              setJobs(res.data)
            })
          
            
        }
      getJobs()
    }, [skill,country,remote,language])
    useEffect(() => {
        async function getMoreJobs(){
            if(skip>0){
                await axios.get(`http://https://job-board-nodejs-server-70vpm8n7s-anthonyezeji.vercel.app//jobs/${skill}/${country}/${remote}/${language}?skip=${skip}`).then(res=>{
                      console.log(res.data)
                      setJobs(res.data)
                    })
              }
             
        }
        getMoreJobs()
     
    }, [skip])
    
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


    function handleSkip(num){
        if(num == -20){
           if(skip+num<0){
            setSkip(0)
           }else{
            setSkip(skip+num)
           }
        }else if(num == 20){
                if(jobs.length<20){
                 return
            }else{
                setSkip(skip+num)
            }
         }
    }
  return (
    <div className = 'home'>
       <ToastContainer />
        <NavBar/>
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
            <MenuItem className = 'select-item' value = 'all'>All</MenuItem>
            <MenuItem className = 'select-item' value = '.net'>.Net</MenuItem>
            <MenuItem className = 'select-item' value = 'android'>Android</MenuItem>
            <MenuItem className = 'select-item' value = 'angular'>Angular</MenuItem>
            <MenuItem className = 'select-item' value = 'aws'>AWS</MenuItem>
            <MenuItem className = 'select-item' value = 'blockchain'>Blockchain</MenuItem>
            <MenuItem className = 'select-item' value = 'c++'>C++</MenuItem>
            <MenuItem className = 'select-item' value = 'cloud'>Cloud</MenuItem>
            <MenuItem className = 'select-item' value = 'csharp'>C#</MenuItem>
            <MenuItem className = 'select-item' value = 'css'>CSS</MenuItem>
            <MenuItem className = 'select-item' value = 'devops'>Devops</MenuItem>
            <MenuItem className = 'select-item' value = 'django'>Django</MenuItem>
            <MenuItem className = 'select-item' value = 'docker'>Docker</MenuItem>
            <MenuItem className = 'select-item' value = 'elixir'>Elixir</MenuItem>
            <MenuItem className = 'select-item' value = 'engineer'>Engineer</MenuItem>
            <MenuItem className = 'select-item' value = 'flask'>Flask</MenuItem>
            <MenuItem className = 'select-item' value = 'golang'>Golang</MenuItem>
            <MenuItem className = 'select-item' value = 'ios'>IOS</MenuItem>
            <MenuItem className = 'select-item' value = 'java'>Java</MenuItem>
            <MenuItem className = 'select-item' value = 'javascript'>Javascript</MenuItem>
            <MenuItem className = 'select-item' value = 'junior'>Junior</MenuItem>
            <MenuItem className = 'select-item' value = 'kotlin'>Kotlin</MenuItem>
            <MenuItem className = 'select-item' value = 'kubernetes'>Kubernetes</MenuItem>
            <MenuItem className = 'select-item' value = 'manager'>Manager</MenuItem>
            <MenuItem className = 'select-item' value = 'mobile'>Mobile</MenuItem>
            <MenuItem className = 'select-item' value = 'mongodb'>MongoDB</MenuItem>
            <MenuItem className = 'select-item' value = 'nodejs'>NodeJS</MenuItem>
            <MenuItem className = 'select-item' value = 'nosql'>NoSQL</MenuItem>
            <MenuItem className = 'select-item' value = 'php'>PHP</MenuItem>
            <MenuItem className = 'select-item' value = 'postgres'>Postgres</MenuItem>
            <MenuItem className = 'select-item' value = 'python'>Python</MenuItem>
            <MenuItem className = 'select-item' value = 'react'>React</MenuItem>
            <MenuItem className = 'select-item' value = 'react-native'>React-Native</MenuItem>
            <MenuItem className = 'select-item' value = 'reactjs'>ReactJS</MenuItem>
            <MenuItem className = 'select-item' value = 'ruby-on-rails'>Ruby On Rails</MenuItem>
            <MenuItem className = 'select-item' value = 'rust'>Rust</MenuItem>
            <MenuItem className = 'select-item' value = 'scala'>Scala</MenuItem>
            <MenuItem className = 'select-item' value = 'senior'>Senior</MenuItem>
            <MenuItem className = 'select-item' value = 'sql'>SQL</MenuItem>
            <MenuItem className = 'select-item' value = 'svelte'>Svelte</MenuItem>
            <MenuItem className = 'select-item' value = 'typescript'>Typescript</MenuItem>
            <MenuItem className = 'select-item' value = 'vue'>Vue</MenuItem>
            <MenuItem className = 'select-item' value = 'vuejs'>VueJS</MenuItem>
            <MenuItem className = 'select-item' value = 'web3'>Web3.0</MenuItem>

  
 
          
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
            <MenuItem className = 'select-item' value = 'all'>All</MenuItem>
          <MenuItem className = 'select-item' value = 'Austria'>Austria</MenuItem>
          <MenuItem className = 'select-item' value = 'Argentina'>Argentina</MenuItem>
          <MenuItem className = 'select-item' value = 'Brazil'>Brazil</MenuItem>
          <MenuItem className = 'select-item' value = 'Canada'>Canada</MenuItem>
          <MenuItem className = 'select-item' value = 'Germany'>Germany</MenuItem>
          <MenuItem className = 'select-item' value = 'India'>India</MenuItem>
          <MenuItem className = 'select-item' value = 'Mexico'>Mexico</MenuItem>
          <MenuItem className = 'select-item' value = 'Portugal'>Portugal</MenuItem>
          <MenuItem className = 'select-item' value = 'Spain'>Spain</MenuItem>
          <MenuItem className = 'select-item' value = 'Switzerland'>Switzerland</MenuItem>
          <MenuItem className = 'select-item' value = 'United Kingdom'>United Kingdom</MenuItem>
          <MenuItem className = 'select-item' value = 'United States of America'>United States of America</MenuItem>

        </Select>
        <h5>Remote Job Position</h5>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={remote}
          defaultValue={remote}
          label="remote"
          name = 'remote'
          onChange={(e)=>handleChange(e)}
        >
            <MenuItem className = 'select-item' value = 'all'>All</MenuItem>
          <MenuItem className = 'select-item' value = 'remote'>Fully Remote</MenuItem>
          <MenuItem className = 'select-item' value = 'partlyRemote'>Partly Remote</MenuItem>
          <MenuItem className = 'select-item' value = 'false'>In Office</MenuItem>
        </Select>
        <h5>Description Language</h5>
        <Select
        
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          defaultValue={language}
          label="Language"
          name = 'language'
          onChange={(e)=>handleChange(e)}
        ><MenuItem className = 'select-item'  value = 'all'>All</MenuItem>
          <MenuItem className = 'select-item'  value = 'en'>English</MenuItem>
          <MenuItem className = 'select-item'  value = 'es'>Spanish</MenuItem>
          <MenuItem className = 'select-item'  value = 'pt'>Portugese</MenuItem>
          <MenuItem className = 'select-item'  value = 'fr'>French</MenuItem>
          <MenuItem className = 'select-item'  value = 'de'>German</MenuItem>
          <MenuItem className = 'select-item'  value = 'nl'>Dutch</MenuItem>
        </Select>
        <div  className="skip-container">
            <Button onClick={()=>handleSkip(-20)} >prev</Button>
            <h2>{0+skip } - {20+skip}</h2>
            
            <h2></h2>
            <Button onClick={()=>handleSkip(20)} >next</Button>
        </div>
      </div>
      <ul  className = 'job-list'>
        {jobs.length>0?jobs.map((job,index)=>{
          
          return(
            <JobItem props={job}/>
          )
        }):<div style={{padding:30}}><h1 >No Posts</h1><p style ={{color:'white'}}>please change search parameters</p></div>}
      </ul>
      
    </div>
  )
}

export default Home