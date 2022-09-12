import { Button, Input } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'

import '../css/Register.css'
function Register() {
    const [formInfo, setFormInfo] = useState({firstName:'',lastName:'',email:'',password:''})

let navigate = useNavigate()
    function formInfoChangeHandler(e){
switch (e.target.id) {
    case 'first-name':
        setFormInfo({...formInfo,firstName:e.target.value})
        break;
        case 'last-name':
        setFormInfo({...formInfo,lastName:e.target.value})
        break;
        case 'email':
        setFormInfo({...formInfo,email:e.target.value})
        break;
        case 'password':
        setFormInfo({...formInfo,password:e.target.value})
        break;

    default:
        break;
}
    }
    
    async function handleRegisterClick(){
        await axios.post('https://job-board-nodejs-server-70vpm8n7s-anthonyezeji.vercel.app/users/register', formInfo).then(res=>{
           if(res.data.hasOwnProperty('message')){
            alert(res.data.message)
           }else if (res.status == 201){
            alert('registration confirmed')
            navigate('/login')
           }
        })
    }
  return (
    <div className="register">
        <NavBar/>
        <div className="register-form">
            <div className="register-form-input">
                <h5>First Name</h5>
                <Input onChange={(e)=>formInfoChangeHandler(e)} id = "first-name" className = 'input'></Input>
            </div>
            <div className="register-form-input">
            <h5>Last Name</h5>
            <Input onChange={(e)=>formInfoChangeHandler(e)} id ="last-name" className = 'input'></Input>
            </div>
            <div className="register-form-input">
            <h5>E-mail</h5>
            <Input onChange={(e)=>formInfoChangeHandler(e)} id ="email" className = 'input'></Input>
            </div>
            <div className="register-form-input">
            <h5>Password</h5>
            <Input onChange={(e)=>formInfoChangeHandler(e)} type='password' id ="password" className = 'input'></Input>
            </div>
            <Button onClick={handleRegisterClick} style={{color:'yellow', marginTop:10}}>Register</Button>
            <p style ={{color:'white'}}>Already have an account? <a style={{color:"white"}} href="/login">Login.</a></p>
        </div>
    </div>
  )
}

export default Register