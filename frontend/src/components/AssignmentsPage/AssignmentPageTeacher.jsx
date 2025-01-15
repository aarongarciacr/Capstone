import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import BooksLottie from "../../assets/lotties/books.json";
import DogLottie from "../../assets/lotties/dogWithHeadphones.json";
import Lottie from "lottie-react";
import "./AssignmentsPage.css";
import { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { fetchGetStudentAssignments } from "../../store/assignment";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteAssignmentModal from "./DeleteAssignmentModal";
import AssignModal from "./AssignModal";

function AssignmentsPageTeacher() {
  const { studentId } = useParams();
  const sessionUser = useSelector((state) => state.userSession?.user);
  const assignments = useSelector(
    (state) => state.assignments?.studentAssignments?.[studentId]?.assignments
  );

  console.log("assignment", assignments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetStudentAssignments(studentId));
  }, [dispatch, studentId]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <main>
      <div className="assignments-page">
        <section className="assignmentsPage-assignments-container">
          <h1 className="h1-assignments">Assignments</h1>
          <OpenModalButton
            buttonText="Assign an Exercise"
            modalComponent={<AssignModal studentId={studentId} />}
            className="signup-btn"
          />
          {assignments?.length > 0 ? (
            assignments.map((assignment, index) => (
              <div className="assignmentPage-assignment-box" key={index}>
                <div className="assignmentPage-exercise-box">
                  <p>Exercise: {assignment.Exercise.name}</p>
                  <p>Description: {assignment.Exercise.description}</p>
                  <p>Difficulty: {assignment.Exercise.difficulty}</p>
                  <p>Assigned to: {assignment.student.username}</p>
                  <p>
                    Assigned Date:{" "}
                    {new Date(assignment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="start-btn-container">
                  <OpenModalButton
                    modalComponent={
                      <DeleteAssignmentModal
                        assignmentId={assignment.id}
                        studentId={studentId}
                      />
                    }
                    buttonText={"Remove Assignment"}
                    className={"delete-button"}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No assignments available.</p>
          )}
        </section>
        <div className="dog lottie">
          <Lottie animationData={DogLottie} />
        </div>
        <div className="books lottie">
          <Lottie animationData={BooksLottie} />
        </div>
      </div>
    </main>
  );
}

export default AssignmentsPageTeacher;
