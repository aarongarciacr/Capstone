import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import StudentLottie from "../../assets/lotties/students.json";
import Lottie from "lottie-react";
import "./StatsPage.css";
import { useEffect } from "react";
import { fetchGetStats } from "../../store/user";
import { fetchGetAllSessions } from "../../store/session";

function StatsPage() {
  const sessionUser = useSelector((state) => state.userSession?.user);
  const stats = useSelector((state) => state.stats?.stats);
  const sessions = useSelector((state) => state.sessions?.sessions || []);
  const dispatch = useDispatch();
  console.log("HEEEY", sessions);

  useEffect(() => {
    dispatch(fetchGetStats(sessionUser.id));
    dispatch(fetchGetAllSessions());
  }, [dispatch, sessionUser]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <main className="homepage">
      <h1>Your Stats</h1>
      <section className="stats-container">
        <div className="total-sessions">
          <h2>Total Sessions</h2>
          <p>{stats?.totalSession}</p>
        </div>
        <div className="accuracy">
          <h2>Accuracy</h2>
          <p>{stats?.accuracy}%</p>
        </div>
        <div className="most-practiced">
          <h2>Most Practiced</h2>
          <p>{stats?.mostPracticed}</p>
        </div>
      </section>
      <section className="sessions-container">
        {sessions?.length > 0 ? (
          sessions.map((session) => (
            <div className="session-box" key={session.id}>
              <h3>{session.Exercise.name}</h3>
              <p>Difficulty: {session.Exercise.difficulty}</p>
              <p>Score: {session.score}</p>
              <p>Accuracy: {session.accuracy}</p>
            </div>
          ))
        ) : (
          <p>No sessions available</p>
        )}
      </section>
    </main>
  );
}

export default StatsPage;
