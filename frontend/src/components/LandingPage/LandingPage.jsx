import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import GuitarLottie from "../../assets/lotties/guitar.json";
import Astronauta from "../../assets/lotties/astronauta.json";
import SpeakerLottie from "../../assets/lotties/speaker.json";
import GuyLottie from "../../assets/lotties/guy.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const sessionUser = useSelector((state) => state.userSession.user);
  const navigate = useNavigate();
  if (sessionUser) return <Navigate to="/home" replace={true} />;

  return (
    <main>
      <div className="landingPage">
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
          <div className="astro-ctn">
            <Lottie animationData={Astronauta} />
          </div>
          <div className="guitar-ctn">
            <Lottie animationData={GuitarLottie} />
          </div>
          <div className="speaker-ctn">
            <Lottie animationData={SpeakerLottie} />
          </div>
          <div className="guy-ctn">
            <Lottie animationData={GuyLottie} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
