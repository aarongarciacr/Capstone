import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchGetStats } from "../../store/user";
import { fetchGetSessionsByUserId } from "../../store/session";
import Lottie from "lottie-react";
import HeadphonesLottie from "../../assets/lotties/headphones.json";
import MusiciansLottie from "../../assets/lotties/musicians.json";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function StatsPageTeacher() {
  const { studentId } = useParams();
  const sessionUser = useSelector((state) => state.userSession?.user);
  const stats = useSelector((state) => state.stats?.stats);
  const sessions = useSelector(
    (state) => state.sessions?.userSessions?.[studentId] || []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("sessions", sessions);
  useEffect(() => {
    if (studentId) {
      dispatch(fetchGetStats(studentId));
      dispatch(fetchGetSessionsByUserId(studentId));
    }
  }, [dispatch, studentId]);

  if (!sessionUser || sessionUser.role === "student")
    return <Navigate to="/" replace={true} />;

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <main>
      <div className="statsPage">
        <h1 className="h1-stats">Stats for Student #{studentId}</h1>
        <button
          className="start-button view-student-assign-btn"
          type="button"
          onClick={() => navigate(`/students/${studentId}/assignments`)}
        >
          Assignments
        </button>
        <section className="statsPage-stats-container">
          <div className="total-sessions">
            <h2>Total Sessions</h2>
            <h2>{stats?.totalSession}</h2>
          </div>
          <div className="accuracy">
            <h2>Accuracy</h2>
            <h2>{stats?.accuracy}%</h2>
          </div>
          <div className="most-practiced">
            <h2>Most Practiced</h2>
            <h2>{stats?.mostPracticed}</h2>
          </div>
        </section>
        <section className="carousel-container">
          <Carousel
            responsive={responsive}
            infinite={true}
            showDots={true}
            ssr={true}
          >
            {sessions?.length > 0 ? (
              sessions?.map((session) => (
                <Link
                  to={`/students/${studentId}/sessions/${session.id}`}
                  key={session.id}
                  className="session-box"
                >
                  <h2>{session.Exercise.name}</h2>
                  <p>Difficulty: {session.Exercise.difficulty}</p>
                  <p>Score: {session.score}</p>
                  <p>Accuracy: {session.accuracy}%</p>
                </Link>
              ))
            ) : (
              <p>No sessions available</p>
            )}
          </Carousel>
        </section>
        <section className="headphones-container">
          <Lottie animationData={HeadphonesLottie} />
        </section>
        <section className="musicians-container">
          <Lottie animationData={MusiciansLottie} />
        </section>
      </div>
    </main>
  );
}

export default StatsPageTeacher;
