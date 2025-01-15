import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import BooksLottie from "../../assets/lotties/books.json";
import DogLottie from "../../assets/lotties/dogWithHeadphones.json";
import Lottie from "lottie-react";
import "./ExercisesPage.css";
import { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { fetchGetAllExercises, fetchStartExercise } from "../../store/exercise";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteExerciseModal from "./DeleteExerciseModal";
import CreateExerciseModel from "./CreateExerciseModal";
import EditExercisePage from "./EditExercisePage";

function ExercisesPage() {
  const sessionUser = useSelector((state) => state.userSession?.user);
  const exercises = useSelector((state) => state.exercises?.exercises);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGetAllExercises());
  }, [dispatch]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  const handleStart = async (exerciseId) => {
    const session = await dispatch(fetchStartExercise(exerciseId));
    navigate(`/exercises/${exerciseId}/start`);
  };
  0;

  return (
    <main>
      <div className="exercises-page">
        <h1 className="h1-exercises">Exercises</h1>
        <br></br>
        <br></br>
        {sessionUser.role === "teacher" && (
          <OpenModalButton
            modalComponent={<CreateExerciseModel navigate={navigate} />}
            buttonText={"Create New Exercise"}
            className={"delete-button"}
          />
        )}
        <section className="exercisesPage-exercises-container">
          {exercises?.length > 0 ? (
            exercises.map((exercise, index) => (
              <div className="singleExercise-box" key={index}>
                <div className="exercisePage-exercise-box">
                  <p>Exercise: {exercise.name}</p>
                  <p>Description: {exercise.description}</p>
                  <p>Difficulty: {exercise.difficulty}</p>
                  <p>Type: {exercise.type}</p>
                </div>
                <div className="start-btn-container">
                  {sessionUser.role === "teacher" ? (
                    <>
                      <OpenModalButton
                        modalComponent={
                          <EditExercisePage
                            exerciseId={exercise.id}
                            navigate={navigate}
                          />
                        }
                        buttonText={"Edit"}
                        className={"delete-button"}
                      />
                      <OpenModalButton
                        modalComponent={
                          <DeleteExerciseModal exerciseId={exercise.id} />
                        }
                        buttonText={"Delete"}
                        className={"delete-button"}
                      />
                    </>
                  ) : (
                    <button
                      onClick={() => handleStart(exercise.id)}
                      type="button"
                      className="start-button"
                    >
                      Start
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No exercises available.</p>
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

export default ExercisesPage;
