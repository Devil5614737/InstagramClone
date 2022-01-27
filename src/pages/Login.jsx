import { useState,useContext } from 'react';
import '../styles/login.css';
import {Button} from '../components/Button';
import {Input} from '../components/Input';
import Background from '../assets/loginImage.jpg';
import Logo from '../assets/logo.png';
import {useNavigate} from 'react-router-dom';
import {Context} from '../Context';

function Login() {
  const{setToken}=useContext(Context);
  const navigate=useNavigate();
  const [showSignup,setShowSignup]=useState(false)
  const[values,setValues]=useState({
    fullname:'',
    username:'',
    email:'',
    password:'',
  })
const handleChange=e=>{
  setValues({...values,[e.target.name]:e.target.value})
}
// login the user
const loginUser=async()=>{
  const{email,password}=values;
  const res=await fetch('https://instagram-backend12.herokuapp.com/login',{
    method:'POST',
    body:JSON.stringify({
      email,password
    }),
    headers:{
      'Content-Type':'application/json'
    }
  });
  const data=await res.json()
  if(res.status===200){
    localStorage.setItem('token',data)
    setToken(data)
    navigate('/home')
  }else{
    navigate('/')
  }
}


// signup the user
const signupUser=async()=>{
  const{fullname,username,email,password}=values;
  const res=await fetch('https://instagram-backend12.herokuapp.com/signup',{
    method:'POST',
    body:JSON.stringify({
    fullname, username, email,password
    }),
    headers:{
      'Content-Type':'application/json'
    }
  });
  if(res.status===200){
    navigate('/')
  }
  // const data=await res.json()
}





  return (
    <div className='login-container'>
      <img className='background' src={Background} alt='background'/>
    {!showSignup &&   <div className="login-card">
        <img src={Logo} alt="instagram logo" className="logo" />
        <div className="input-container">
          <Input className='input' type="email" placeholder='email address' onChange={handleChange} value={values.email} name='email'/>
          <Input className='input' type="password" placeholder='password' onChange={handleChange} value={values.password} name='password'/>
          <Button className='login-btn' onClick={loginUser}>Log In</Button>
        </div>
        <div className="signup-link">
          <p>Don't have an account? <span onClick={()=>setShowSignup(true)}>Sign up</span></p>
        </div>
      </div>}
    {showSignup &&   <div className="login-card">
        <img src={Logo} alt="instagram logo" className="logo" />
        <div className="input-container">
          <Input className='input' type="text" placeholder='fullname' onChange={handleChange} value={values.fullname} name='fullname'/>
          <Input className='input' type="text" placeholder='username' onChange={handleChange} value={values.username} name='username'/>
          <Input className='input' type="email" placeholder='email address' onChange={handleChange} value={values.email} name='email'/>
          <Input className='input' type="password" placeholder='password' onChange={handleChange} value={values.password} name='password'/>
          <Button onClick={signupUser} className='login-btn'>Sign up</Button>
        </div>
      </div>}

    </div>
  )
}

export default Login;
