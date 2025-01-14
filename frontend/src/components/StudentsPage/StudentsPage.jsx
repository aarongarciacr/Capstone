import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import HeadphonesLottie from "../../assets/lotties/headphones.json";
import MusiciansLottie from "../../assets/lotties/musicians.json";
import Lottie from "lottie-react";
import "./StudentsPage.css";
import { useEffect } from "react";
import { fetchGetStudents } from "../../store/user";
import { fetchGetAllSessions } from "../../store/session";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function StudentsPage() {
  const sessionUser = useSelector((state) => state.userSession?.user);
  const students = useSelector((state) => state.stats?.students);
  console.log("students", students);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetStudents());
  }, [dispatch]);

  if (!sessionUser || sessionUser.role === "student")
    return <Navigate to="/" replace={true} />;

  return (
    <main>
      <div className="students-page">
        <h1 className="h1-stats">List of Students</h1>
        {students?.length > 0 ? (
          students.map((student, index) => (
            <Link
              to={`/students/${student.id}/stats`}
              className="student-container"
              key={index}
            >
              <div className="students-page-name-ctn inner-ctn">
                <h2>Student Name:</h2>
                <p className="student-info">
                  {student.firstName} {student.lastName}
                </p>
              </div>
              <div className="students-page-username-ctn inner-ctn">
                <h2>Username:</h2>
                <p className="student-info">{student.username}</p>
              </div>
              <div className="students-page-email-ctn inner-ctn">
                <h2>Email:</h2>
                <p className="student-info">{student.email}</p>
              </div>
              <div className="students-page-signup-ctn inner-ctn">
                <h2>Signed up since:</h2>
                <p className="student-info">
                  {new Date(student.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <h1>No students found</h1>
        )}
      </div>
    </main>
  );
}

export default StudentsPage;
