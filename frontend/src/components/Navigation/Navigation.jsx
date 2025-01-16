import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LogoLottie from "../../assets/lotties/logo.json";
import Lottie from "lottie-react";
// import BRB from "../../assets/BRB-no-back.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.userSession.user);

  return (
    <nav className="nav-container">
      <ul className="nav-box">
        <li id="logo-link-container">
          <Link to="/" className="logo-link">
            <Lottie animationData={LogoLottie} className="logo link"></Lottie>
          </Link>
        </li>
        {sessionUser && (
          <ul className="all-navlinks">
            <li className="home-link-container">
              <Link to="/home" className="home-link link">
                <h2>Home</h2>
              </Link>
            </li>
            {sessionUser?.role === "teacher" ? (
              <li className="students-link-container">
                <Link to="/students" className="students-link  link">
                  <h2>Students</h2>
                </Link>
              </li>
            ) : (
              <li className="stats-link-container">
                <Link to="/stats" className="stats-link  link">
                  <h2>Stats</h2>
                </Link>
              </li>
            )}
            <li className="assignments-link-container">
              <Link to="/assignments" className="assignments-link link">
                <h2>Assignments</h2>
              </Link>
            </li>
            <li className="exercises-link-container">
              <Link to="/exercises" className="exercises-link link">
                <h2>Exercises</h2>
              </Link>
            </li>
            <li className="piano-link-container">
              <Link to="/piano" className="piano-link link">
                <h2>Piano</h2>
              </Link>
            </li>
            <li className="about-link-container">
              <Link to="/about" className="about-link link">
                <h2>About Us</h2>
              </Link>
            </li>
          </ul>
        )}
        {isLoaded && (
          <li className="profile-box">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
