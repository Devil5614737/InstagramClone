import { useState, useEffect } from "react";
import "../styles/profilepic.css";

export const ProfilePic = ({ show, setIsUploaded }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    postDetails();
  }, [selectedImage]);

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
      fetch("http://localhost:4000/user/updatepic", {
        method: "PUT",
        body: JSON.stringify({
          pic: url,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsUploaded(true);
          console.log(data);
        });
    }
  }, [url]);

  return (
    <div className="profile-pic-container">
      <p className="title">Change Profile Photo</p>
      <hr />
      <label className="label" htmlFor="upload">
        Upload Photo
      </label>
      <hr />
      <input
        type="file"
        id="upload"
        name="myImage"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
      />
      <p onClick={() => show(false)}>cancel</p>
    </div>
  );
};
