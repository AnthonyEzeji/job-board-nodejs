import React, { useEffect, useState } from 'react'
import '../css/NavBar.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Navigate, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({})
  var navigate = useNavigate()
  useEffect(() => {
    if(window.sessionStorage.hasOwnProperty('logged-in-user')){
    
      if(JSON.parse(window.sessionStorage.getItem('logged-in-user'))?.hasOwnProperty('email')){
    
        setLoggedIn(true)
        setLoggedInUser(JSON.parse(window.sessionStorage.getItem('logged-in-user')))
      }
      
    }
  }, [])
  function handleLogout(){
    setLoggedIn(false)
    window.sessionStorage.setItem('logged-in-user',null)
    
    navigate('/login')
  }

  function handleSavedJobsClick(){
    if(window.sessionStorage.hasOwnProperty('logged-in-user')){
    
      if(JSON.parse(window.sessionStorage.getItem('logged-in-user'))?.hasOwnProperty('email')){
        navigate(`/saved-jobs/${JSON.parse(window.sessionStorage.getItem('logged-in-user')).email}`)
      
      }else{
        alert('Please login to view saved job listings.')
      }
      
    }else{
      alert('Please login to view saved job listings.')
    }
    
  }
 
  return (
    <div className = 'navbar'>
      < HomeIcon onClick={()=>navigate('/')} id='home-icon'/>
      {!loggedIn ?<a className = 'login-btn' href="/login">Login</a>:<p className = 'login-btn' onClick={handleLogout}>Logout</p>}
      <div onClick={handleSavedJobsClick}  className = 'saved-btn'><FavoriteIcon style={{color:'yellow'}}/><ArrowRightAltIcon style={{color:'yellow'}}/><AttachMoneyIcon  style={{color:'yellow'}}/></div>
      
    </div>
  )
}

export default NavBar