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
            await axios.post('http://3.87.187.44:5000/users/login',loginCredentials).then(res=>{
                if(res.status == 200){
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
                <h5>
                    E-mail
                </h5>
                <Input id= 'email' onChange = {(e)=>handleChange(e)}/>
            </div>
            <div className="input-field">
                <h5>
                    Password
                </h5>
                <Input id= 'password' onChange = {(e)=>handleChange(e)} type='password'/>
            </div>
            <Button onClick={handleLoginClick}>Login</Button>
            <p style = {{color:'white'}}>Dont have an account? <a style={{color:'white'}} href = 'http://3.87.187.44:2000/register'>Register</a></p>
        </div>
      
    </div>
  )
}

export default Login