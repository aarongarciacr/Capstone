import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BooksLottie from "../../assets/lotties/books.json";
import DogLottie from "../../assets/lotties/dogWithHeadphones.json";
import Lottie from "lottie-react";
import { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import {
  fetchCompleteAssignment,
  fetchDeleteAssignment,
  fetchGetAssignments,
  fetchGetStudentAssignments,
} from "../../store/assignment";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteAssignmentModal from "./DeleteAssignmentModal";
import { fetchGetAllExercises } from "../../store/exercise";
import { fetchAssignExercise } from "../../store/assignment";
import { useModal } from "../../context/Modal";
import "./AssignModal.css";

function AssignModal({ studentId }) {
  const sessionUser = useSelector((state) => state.userSession?.user);
  const exercises = useSelector((state) => state.exercises?.exercises);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(fetchGetAllExercises());
  }, [dispatch]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  const handleAssign = async (exerciseId, studentId) => {
    try {
      await dispatch(fetchAssignExercise(exerciseId, studentId));
      await dispatch(fetchGetStudentAssignments(studentId));
      alert("Exercise assigned successfully!");
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Failed to assign exercise. Please try again.");
    }
  };

  return (
    <div className="assign-modal-ctn">
      <h1>Exercises</h1>
      <section className="section-box">
        {exercises?.length > 0 ? (
          exercises.map((exercise, index) => (
            <div className="singleExercise-box" key={index}>
              <div className="exercisePage-exercise-box">
                <p>Exercise: {exercise.name}</p>
                <p>Description: {exercise.description}</p>
                <p>Difficulty: {exercise.difficulty}</p>
                <p>Type: {exercise.type}</p>
              </div>
              <button
                type="button"
                onClick={() => handleAssign(exercise.id, studentId)}
                className="start-button"
              >
                Assign
              </button>
            </div>
          ))
        ) : (
          <p>No exercises available.</p>
        )}
      </section>
    </div>
  );
}

export default AssignModal;
