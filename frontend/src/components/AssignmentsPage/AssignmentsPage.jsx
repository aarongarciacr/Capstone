import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import BooksLottie from "../../assets/lotties/books.json";
import DogLottie from "../../assets/lotties/dogWithHeadphones.json";
import Lottie from "lottie-react";
import "./AssignmentsPage.css";
import { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import {
  fetchCompleteAssignment,
  fetchGetAssignments,
} from "../../store/assignment";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteAssignmentModal from "./DeleteAssignmentModal";
import { fetchStartExercise } from "../../store/exercise";

function AssignmentsPage() {
  const sessionUser = useSelector((state) => state.userSession?.user);
  const assignments = useSelector((state) => state.assignments?.assignments);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!assignments) {
      dispatch(fetchGetAssignments());
    }
  }, [dispatch, assignments]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  const handleStartButton = async (exerciseId, assignmentId) => {
    await dispatch(fetchStartExercise(exerciseId));
    await dispatch(fetchCompleteAssignment(assignmentId));
    navigate(`/exercises/${exerciseId}/start`);
  };

  return (
    <main>
      <div className="assignments-page">
        <h1 className="h1-assignments">Assignments</h1>
        <section className="assignmentsPage-assignments-container">
          {assignments?.length > 0 ? (
            assignments?.map((assignment, index) => (
              <div className="assignmentPage-assignment-box" key={index}>
                <div className="assignmentPage-exercise-box">
                  <p>Exercise: {assignment?.Exercise?.name}</p>
                  <p>Description: {assignment?.Exercise?.description}</p>
                  <p>Difficulty: {assignment?.Exercise?.difficulty}</p>
                  <p>
                    Assigned Date:{" "}
                    {new Date(assignment?.createdAt).toLocaleDateString()}
                  </p>
                  {sessionUser?.role === "teacher" && (
                    <p>
                      Assign To: {assignment?.student?.firstName}{" "}
                      {assignment?.student?.lastName}
                    </p>
                  )}
                </div>
                <div className="start-btn-container">
                  {sessionUser?.role === "teacher" ? (
                    <OpenModalButton
                      modalComponent={
                        <DeleteAssignmentModal
                          assignmentId={assignment?.id}
                          studentId={assignment?.student?.id}
                        />
                      }
                      buttonText={"Remove Assignment"}
                      className={"delete-button"}
                    />
                  ) : (
                    <button
                      type="button"
                      className="start-button"
                      onClick={() =>
                        handleStartButton(assignment.exerciseId, assignment.id)
                      }
                    >
                      Start
                    </button>
                  )}
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

export default AssignmentsPage;
