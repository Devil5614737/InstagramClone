import { useState,useEffect } from 'react';
import Profile from './pages/Profile';
import './styles/global.css';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import {Context} from './Context'
import UserProfile from './pages/UserProfile';

function App() {
const[user,setUser]=useState([]);
const[token,setToken]=useState('')
const[userProfile,setUserProfile]=useState([])
const[otherUserPost,setOtherUserPost]=useState([]);
const[isUploaded,setIsUploaded]=useState(false)


useEffect(()=>{
  const fetchUser=async()=>{
  const res=await fetch('https://instagram-backend12.herokuapp.com/user',{
    method:'GET',
    headers:{
      'x-auth-token':localStorage.getItem('token')
    }
  })
  const data=await res.json()
  setUser(data)
  
  }
  fetchUser()
  },[token||isUploaded])

console.log(user)
  return (

  <Context.Provider value={{setUser,user,setToken,userProfile,setUserProfile,otherUserPost,setOtherUserPost,isUploaded,setIsUploaded}}>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/userprofile' element={<UserProfile/>}/>
      </Routes>
  </Context.Provider>
  );
}

export default App;
