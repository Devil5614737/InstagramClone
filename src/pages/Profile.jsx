
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../styles/profile.css";
import Heart from '../assets/heart2.svg'
import Comment from '../assets/comment.svg'
import RemoveIcon from '../assets/removeIcon.svg'
import { Context } from "../Context";
import axios from "axios";
import {ProfilePic} from '../components/ProfilePic';


function Profiile() {
  const{user,setIsUploaded}=useContext(Context);
  const[myPost,setMyPost]=useState([]);
  const[show,setShow]=useState(false);




// removing post
const handleRemove=async(id)=>{
  const res=await fetch('https://instagram-backend12.herokuapp.com/post/removepost',{
    method:'DELETE',
    body:JSON.stringify({
      postId:id
    }),
    headers:{
      "Content-Type":'application/json',
           'x-auth-token':localStorage.getItem('token')
        }
  })
  const data=await res.json()
  console.log(data)
}

  useEffect(() => {
    axios
      .get("https://instagram-backend12.herokuapp.com/post/mypost", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setMyPost(res.data.mypost.reverse()))
      .catch((e) => console.log(e));
  }, [handleRemove]);





  return (
    <div className="main-container">
      <Navbar />
      <div className="profile-container">
        <div className="profile-info">
          <img onClick={()=>setShow(true)} src={user.pic} alt="user" />
          <div className="user-info">
            <div className="userinfo">
              <p>{user.username}</p>
              <p>Edit Profile</p>
            </div>
            <div className="user-stats">
              <p><span>{myPost.length}</span>posts</p>
              <p><span>{user.followers&&user.followers.length}</span>followers</p>
              <p><span>{user.following&&user.following.length}</span>following</p>
            </div>
            <p className="username">
              {user.fullname}
            </p>
          </div>
        </div>
        <div className="post-container">
       <p className="title">Posts</p>
       <div className="user-post-container">
        {myPost&&myPost.map(post=> <div key={post._id} className="posts">
           <img onClick={()=>handleRemove(post._id)} id='removePost' src={RemoveIcon} alt="icon" className="removePost" />
           <img src={post.photo} alt="post" />
           <div className="post-stats-container">
             <div className="post-stats">
               <img src={Heart} alt="icon" />
               <p>{post.likes && post.likes.length}</p>
             </div>
             <div className="post-stats">
               <img src={Comment} alt="icon" />
               <p>{post.comments && post.comments.length}</p>
             </div>
         

             
           </div>
         </div>)}
        
       
       </div>
        </div>
      </div>
      {show && <ProfilePic show={setShow} setIsUploaded={setIsUploaded}/>}
   
    </div>
  );
}

export default Profiile;
