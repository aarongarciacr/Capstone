import { useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import StudentLottie from "../../assets/lotties/students.json";
import AssignmentLottie from "../../assets/lotties/assignments.json";
import ExercisesLottie from "../../assets/lotties/exercises.json";
import StatsLottie from "../../assets/lotties//stats.json";
import Lottie from "lottie-react";
import "./HomePage.css";

function HomePage() {
  const sessionUser = useSelector((state) => state.userSession.user);

  if (!sessionUser) return <Navigate to="/" replace={true} />;
  console.log("role", sessionUser);
  if (sessionUser.role === "teacher") {
    return (
      <main className="homepage">
        <Link to="/students" className="students-container">
          <Lottie
            animationData={StudentLottie}
            style={{ width: "50%", height: "50%" }}
          />
          <div className="student-box">
            <h2>Students</h2>
          </div>
        </Link>
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
      </main>
    );
  }

  return (
    <main className="homepage">
      <Link to="/stats" className="stats-container">
        <Lottie
          animationData={StatsLottie}
          style={{ width: "50%", height: "50%" }}
        />
        <div className="stats-box">
          <h2>Stats</h2>
        </div>
      </Link>
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
    </main>
  );
}

export default HomePage;
