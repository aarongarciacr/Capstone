import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import Logo from "../../assets/images/favicon.png";
// import BRB from "../../assets/BRB-no-back.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.userSession.user);

  return (
    <nav className="nav-container">
      <ul className="nav-box">
        <li id="home-link-container">
          <Link to="/" className="home-link">
            <img src={Logo} className="logo"></img>
            {/* <img src={BRB} className="logo-letters"></img> */}
            {/* <p className="illBRB">I&apos;ll BRB</p> */}
          </Link>
        </li>
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
