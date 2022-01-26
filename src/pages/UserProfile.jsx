
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import "../styles/profile.css";
import Heart from '../assets/heart2.svg'
import Comment from '../assets/comment.svg'
import RemoveIcon from '../assets/removeIcon.svg'
import { Context } from "../Context";
import axios from "axios";

function UserProfile() {
  const{userProfile,otherUserPost}=useContext(Context);
  const[myPost,setMyPost]=useState()






  return (
    <div className="main-container">
      <Navbar />
      <div className="profile-container">
        <div className="profile-info">
          <img src={userProfile.pic} alt="user" />
          <div className="user-info">
            <div className="userinfo">
              <p>{userProfile.username}</p>
              <p className='follow-btn'>follow</p>
            </div>
            <div className="user-stats">
              <p><span>{otherUserPost.length}</span>posts</p>
              <p><span>{userProfile.followers&&userProfile.followers.length}</span>followers</p>
              <p><span>{userProfile.following&&userProfile.following.length}</span>following</p>
            </div>
            <p className="username">
              {userProfile.username}
            </p>
          </div>
        </div>
        <div className="post-container">
       <p className="title">Posts</p>
       <div className="user-post-container">
        {otherUserPost&&otherUserPost.map(post=> <div key={post._id} className="posts">
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
    </div>
  );
}

export default UserProfile;
