import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import backgroundImage from "../../assets/images/Homepage_background.jpg";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const sessionUser = useSelector((state) => state.userSession.user);
  const navigate = useNavigate();
  if (sessionUser) return <Navigate to="/home" replace={true} />;

  return (
    <main className="landingPage">
      <div className="homepage-box">
        <h1 className="h1-title">Sign up to start your training!</h1>
        <div className="homepage-buttons">
          <OpenModalButton
            buttonText="Sign up"
            modalComponent={<SignupFormModal navigate={navigate} />}
            className="signup-btn"
          />
          <p>or</p>
          <OpenModalButton
            buttonText="Login"
            modalComponent={<LoginFormModal navigate={navigate} />}
            className="login-btn"
          />
        </div>
      </div>
      <div
        className="background-img"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
        }}
      ></div>
    </main>
  );
}

export default LandingPage;
