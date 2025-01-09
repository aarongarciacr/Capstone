import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import StudentLottie from "../../assets/lotties/students.json";
import Lottie from "lottie-react";
import "./StatsPage.css";
import { useEffect } from "react";
import { fetchGetStats } from "../../store/user";
import { fetchGetAllSessions } from "../../store/session";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function StatsPage() {
  const sessionUser = useSelector((state) => state.userSession?.user);
  const stats = useSelector((state) => state.stats?.stats);
  const sessions = useSelector((state) => state.sessions?.sessions || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetStats(sessionUser.id));
    dispatch(fetchGetAllSessions());
  }, [dispatch, sessionUser]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
      //   partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <main className="statsPage">
      <h1 className="h1-stats">Your Stats</h1>
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
          swipeable={false}
          draggable={false}
          showDots={true}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          //   autoPlay={true}
          //   autoPlaySpeed={1000}
          keyBoardControl={true}
          //   customTransition="all .5"
          transitionDuration={500}
          //   containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          //   dotListClass="custom-dot-list-style"
          //   itemClass="carousel-item-padding-40-px"
          //   centerMode={true}
          //   renderDotsOutside={true}
        >
          {sessions?.length > 0 ? (
            sessions?.map((session) => (
              <div className="session-box" key={session.id}>
                <h2>{session.Exercise.name}</h2>
                <p className="session-data">
                  Difficulty: {session.Exercise.difficulty}
                </p>
                <p className="session-data">Score: {session.score}</p>
                <p className="session-data">Accuracy: {session.accuracy}%</p>
              </div>
            ))
          ) : (
            <p>No sessions available</p>
          )}
        </Carousel>
        ;
      </section>
      {/* <section className="sessions-container">
        {sessions?.length > 0 ? (
          sessions?.map((session) => (
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
      </section> */}
    </main>
  );
}

export default StatsPage;
