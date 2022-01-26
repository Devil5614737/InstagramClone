import { useContext,useState } from "react";
import "../styles/navbar.css";
import InstaLogo from "../assets/logo.png";
import Heart from "../assets/heart.svg";
import Home from "../assets/home.svg";
import Messenger from "../assets/messenger.svg";
import Compass from "../assets/compass.svg";
import Plus from "../assets/plus.svg";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";

export const Navbar = () => {
  const{user}=useContext(Context);
  const[showModal,setShowModal]=useState(false)
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile");
  };
  const goToHome = () => {
    navigate("/home");
  };

const handleLogout=()=>{
  localStorage.removeItem('token')
  navigate('/')
}

  return (
    <>
    <div className="navbar-container">
      <img onClick={goToHome} src={InstaLogo} alt="logo" className="logo" />

      <input type="text" id="input" placeholder="search" />

      <div className="links">
        <ul>
          <li>
            <img onClick={goToHome} src={Home} alt="icon" />
            <img src={Messenger} alt="icon" />
            <img src={Plus} alt="icon" />
            <img src={Compass} alt="icon" />
            <img src={Heart} alt="icon" />
            <img
              onClick={()=>setShowModal(true)}
              src={user.pic}
              alt="user"
            />{" "}
          </li>
        </ul>
      </div>
      
    </div>
    {showModal&&<div className="logout-container">
      <p onClick={goToProfile}>Profile</p>
      <p onClick={handleLogout}>Logout</p>
      <hr />
      <p onClick={()=>setShowModal(false)}>close</p>

    </div>}
    </>
  );
};
