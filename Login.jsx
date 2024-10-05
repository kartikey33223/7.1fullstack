import React,{useState} from 'react'
import Input from './Input'
import Button from './Button'
import {Link} from 'react-router-dom'
import './App.css'
import './Login.css'
import { signInWithGooglePopup, createUserDocFromAuth,
     signinAuthUserWithEmailAndPassword} from './utils/firebase'
const Login = (props)=>{
    const logGoogleUser = async () =>{
        // TODO
        const {user}  = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
        
    }
        
    const [contact, setContact] = useState({
        email: '',
        password: ''
    })
       
    const {email, password} = contact
    

    
    const handleChange = (event)=>{
        const {name, value} = event.target
        setContact ((preValue)=>{  
        return {
        ...preValue,
        [name]: value
        }
        })
    }

    return <div className= 'header-div'>

      
       <Input 
       name= 'email'
       type= 'text'
       placeholder ='email'
       onChange = {handleChange}
       value = {contact.email}
       />

       <br></br>

       <Input 
       name='password'
       type= 'password'
       placeholder ='password'
       onChange = {handleChange}
       value = {contact.password}
       />

       <br></br>

       <button>
        Sign in
       </button>
       <br></br>
        <button onClick={logGoogleUser}>
            Log in with Google
        </button>
       <br></br>
       <br></br>

       <Link to='/signup'>
        Sign up instead
       </Link>  

    </div>

}
export default Login;