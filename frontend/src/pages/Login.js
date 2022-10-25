import { Button, Input } from '@mui/material'
import React, { useState } from 'react'
import '../css/Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
function Login() {

    var navigate = useNavigate()

    const [loginCredentials, setloginCredentials] = useState({email:'',pasword:''})

    async function handleLoginClick(){
        try {
            await axios.post('https://job-board-nodejs-server-70vpm8n7s-anthonyezeji.vercel.app/users/login',loginCredentials).then(res=>{
              
                if(res.data.hasOwnProperty('message')){
                    alert(res.data.message)
                }else if(res.data.hasOwnProperty('email')){
                    window.sessionStorage.setItem('logged-in-user', JSON.stringify(res.data))
                    navigate('/')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    function handleChange(e){
        switch (e.target.id) {
            case 'email':
                setloginCredentials({email:e.target.value, password:loginCredentials.password})
                break;
                case 'password':
                    setloginCredentials({email:loginCredentials.email, password:e.target.value})
                    break;
            default:
                break;
        }
    }
  return (
    <div className = 'login'>
        <NavBar/>
        <div className="login-form">
            <div className="input-field">
                <h5 style={{color:'rgb(169, 178, 185)'}}>
                    E-mail
                </h5>
                <Input id= 'email' onChange = {(e)=>handleChange(e)}/>
            </div>
            <div className="input-field">
                <h5 style={{color:'rgb(169, 178, 185)'}}>
                    Password
                </h5>
                <Input id= 'password' onChange = {(e)=>handleChange(e)} type='password'/>
            </div>
            <Button onClick={handleLoginClick}>Login</Button>
            <p style = {{color:'white'}}>Dont have an account? <a style={{color:'white'}} href = '/register'>Register</a></p>
        </div>
      
    </div>
  )
}

export default Login