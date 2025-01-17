import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import StudentLottie from "../../assets/lotties/students.json";
import AssignmentLottie from "../../assets/lotties/assignments.json";
import ExercisesLottie from "../../assets/lotties/exercises.json";
import StatsLottie from "../../assets/lotties/stats.json";
import LogoLottie from "../../assets/lotties/logo.json";
import Astronauta from "../../assets/lotties/astronauta.json";
import GuyLottie from "../../assets/lotties/guy.json";
import Lottie from "lottie-react";
import "./HomePage.css";
import { useEffect } from "react";
import { restoreUser } from "../../store/user-session";

function HomePage() {
  const sessionUser = useSelector((state) => state.userSession?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <main>
      <div className="homepage">
        {sessionUser?.role === "teacher" ? (
          <Link to="/students" className="students-container">
            <Lottie
              animationData={StudentLottie}
              style={{ width: "50%", height: "50%" }}
            />
            <div className="student-box">
              <h2>Students</h2>
            </div>
          </Link>
        ) : (
          <Link to="/stats" className="stats-container">
            <Lottie
              animationData={StatsLottie}
              style={{ width: "50%", height: "50%" }}
            />
            <div className="stats-box">
              <h2>Stats</h2>
            </div>
          </Link>
        )}

        <Link to="/assignments" className="assignment-container">
          <Lottie
            animationData={AssignmentLottie}
            style={{ width: "50%", height: "50%" }}
          />
          <div className="assignment-box">
            <h2>Assignments</h2>
          </div>
        </Link>
        <Link to="/exercises" className="exercise-container">
          <Lottie
            animationData={ExercisesLottie}
            style={{ width: "50%", height: "50%" }}
          />
          <div className="exercise-box">
            <h2>Exercises</h2>
          </div>
        </Link>
        <div className="astro-ctn">
          <Lottie animationData={Astronauta} />
        </div>
        <div className="logo-ctn">
          <Lottie animationData={LogoLottie} />
        </div>
        <div className="guy-ctn">
          <Lottie animationData={GuyLottie} />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
