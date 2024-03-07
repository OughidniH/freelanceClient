import React from "react";
import Login from "../../components/user/Login";
import NavBar from "../../components/NavBar";
// import CloseIcon from "@mui/icons-material/Close";
// import ShareIcon from "@mui/icons-material/Share";
// import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";:
// import InstagramIcon from "@mui/icons-material/Instagram";
import img from "../../pages/dashboard/freelances/Images/images.jpg";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
// import { useSelector } from "react-redux";:
const Profile = ({ freelance }) => {
  // const [isActive, setIsActive] = useState(false);

  const oneFreelance = useSelector((state) => state.freelanceReducer.freelance);
console.log(oneFreelance)
  return (
    <>
      <Login />
      <NavBar />
      <div className="wrapper">
        <div className="user-card">
          <div className="user-card-img">
            <img src={img} alt="" />
          </div>
          <div className="user-card-info">
            <h2>
              {oneFreelance.firstName} {oneFreelance.lastName} <br /> <br />
              <Rating
                name="half-rating-read"
                value={oneFreelance.rating}
                precision={0.5}
                readOnly
              />
            </h2>
            <p>
              <span>Email:</span>
              {freelance.email}
            </p>
            <p>
              <span>Location:</span>
              {freelance.place}
            </p>
            <p>
              <span>Competence:</span>
              {freelance.competence}
            </p>
            <p>
              <span>Experience:</span>
              {freelance.experience}
            </p>
            <p>
              <span>Availability:</span>
              {freelance.availability}
            </p>
            <p>
              <span>About me:</span>
              {freelance.shortBio}
            </p>
          </div>
          <div className="user-card-info">
            <p>
              <span>Price:</span>
              {freelance.price}
            </p>
            <p>
              <span>Phone:</span>
              {freelance.phone}
            </p>
            <p>
              <span>{freelance.slogan}</span>
            </p>
          </div>
        </div>
        {/* <div className={isActive ? "menuSocial" : "menuSocial active"}>
          <li style={{ "--i": "1", "--clr": "blue" }}>
            <a href="#">
              <FacebookRoundedIcon />
            </a>
          </li>
          <li style={{ "--i": "2", "--clr": "malachite" }}>
            <a href="#">
              <WhatsAppIcon />
            </a>
          </li>
          <li style={{ "--i": "3", "--clr": "red" }}>
            <a href="#">
              <YouTubeIcon />
            </a>
          </li>
          <li style={{ "--i": "4", "--clr": "rose" }}>
            <a href="#">
              <InstagramIcon />
            </a>
          </li>
          <div className="toggle" onClick={handleClick}>
            <ShareIcon className="ion-icon" />
            <CloseIcon className="ion-icon" />
          </div> 
        </div> */}
      </div>
    </>
  );
};

export default Profile;
