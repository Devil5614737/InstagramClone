import { useState, useEffect,useContext,useCallback } from "react";
import "../styles/home.css";
import { Navbar } from "../components/Navbar";
import Upload from "../assets/upload.svg";
import { Button } from "../components/Button";
import Heart from "../assets/heart.svg";
import axios from "axios";
import {Context} from '../Context';
import {useNavigate} from 'react-router-dom'

function Home() {
  const navigate=useNavigate()
  const{user,setUserProfile,setOtherUserPost}=useContext(Context)
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");
  const[profiles,setProfiles]=useState([])
  const[isFollowed,setIsFollowed]=useState(false)
 


  const postDetails = () => {
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "instaclone2");
    data.append("cloud_name", "dwtpwuwax");
    fetch("https://api.cloudinary.com/v1_1/dwtpwuwax/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (url) {
      fetch("https://instagram-backend12.herokuapp.com/post", {
        method: "POST",
        body: JSON.stringify({
          title,
          photo: url,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          window.alert("uploaded successfully...");
        });
    }
  }, [url]);
  
  // implement uploading feature

  const handleUpload = useCallback(
    () => {
      if (selectedImage) {
        postDetails();
      }
    },
    [selectedImage,postDetails],
  );
  // implement comments in post
const handleComment=async(id)=>{
  
  const res=await fetch('https://instagram-backend12.herokuapp.com/post/comment',{
    method:"PUT",
    body:JSON.stringify({
     "text":comment,
      "postId":id,
      // postedBy:id
    }),
    headers:({
      'Content-Type':'application/json',
      'x-auth-token':localStorage.getItem('token')
    })
  })
  const data=await res.json()
  console.log(data)
  
 }



  // fetching posts

  useEffect(() => {
    axios
      .get("https://instagram-backend12.herokuapp.com/post/allpost")
      .then((res) => setPosts(res.data.posts.reverse()))
      .then((e) => console.log(e));

    // return ()=>{
    //   console.log('uploaded successfully')
    // }
  }, [handleUpload,handleComment]);

// fetching other user profiles

useEffect(() => {
  axios
    .get("https://instagram-backend12.herokuapp.com/user/profiles")
    .then((res) => setProfiles(res.data))
    .then((e) => console.log(e));
}, []);


const filteredProfiles=profiles.filter(profile=>{
  return profile._id!==user._id;
})


// other users profile
const handleOtherProfiles=async(id)=>{
fetch('https://instagram-backend12.herokuapp.com/user/otherprofile',{
  method:'POST',
  body:JSON.stringify({
    "id":id
  }),
  headers:({
    'Content-Type':"application/json"
  })
}).then((res)=>res.json()).then(data=>{
  
  setUserProfile(data)
navigate('/userprofile')

}).catch(e=>console.log(e))

fetch('https://instagram-backend12.herokuapp.com/post/userpost',{
  method:'POST',
  body:JSON.stringify({
    "id":id
  }),
  headers:({
    'Content-Type':"application/json"
  })
}).then((res)=>res.json()).then(data=>{
  setOtherUserPost(data.mypost)
  // setUserProfile(data)
// navigate('/userprofile')

}).catch(e=>console.log(e))
}

const handleFollow=()=>{
  setIsFollowed(true)
  isFollowed&&setIsFollowed(false)
}

// TODO:implement useCallBack hook

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content-container">
        <div className="home-content-left">
          <div className="upload-container">
            <div className="upload">
              <textarea
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>
              <div className="upload-icon">
                <label htmlFor="upload">
                  <img src={Upload} alt="icon" />
                </label>
                <input
                  type="file"
                  id="upload"
                  name="myImage"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                  }}
                />
              </div>
            </div>
            <Button onClick={handleUpload} className="upload-btn">
              Upload
            </Button>
          </div>
          <div className="post-card-container">
            {posts.map((post) => (
              <div className="post-card">
                <div className="post-card-top">
                  <img src={post.postedBy.pic} alt="user" />
                  <p className="postedBy">{post.postedBy.username}</p>
                </div>
                <img src={post.photo} alt="post" />
                <div className="res-icons">
                  <img src={Heart} alt="icon" />
                </div>
                <p className="post-desc">
                  <span>{post.postedBy.username}</span>
                  {post.title}
                </p>
                {/* ?TODO: fix the comment username */}
              {post.comments.map(comment=>  <p className="comments">
                  <span>{comment.postedBy.username}</span>{comment.text}
                </p>)}
              
                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    onChange={(e) => setComment(e.target.value)}
                   
                  />
                  <p onClick={()=>handleComment(post._id)} className="comment-btn">Post</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      <div className="friends-container">
        <div className="user-profile">
          <div className="left">
            <img src={user.pic} alt="user" />
              <div className="info">
                <p>{user.username}</p>
                <p>{user.username}</p>
              </div>
          </div>
              <p>Switch</p>
        </div>
        <div className="suggestions">
              <p>Suggestions For You</p>
              <p>See All</p>
        </div>
      {filteredProfiles.map(profile=>  <div className="profiles">
          <div className="profiles-left">
            <img src={profile.pic} alt="user" />
             <p onClick={()=>handleOtherProfiles(profile._id)}>{profile.username}</p>
          </div>
          <div className="profiles-right">
            <p onClick={handleFollow}>{isFollowed?'Follow':"Unfollow"}</p>
          </div>
        </div>)}
       
      </div>
      </div>
    </div>
  );
}

export default Home;
