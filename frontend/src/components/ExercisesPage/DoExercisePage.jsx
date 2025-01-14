import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CircularWavesLottie from "../../assets/lotties/circularWaves.json";
import Astronauta from "../../assets/lotties/astronauta.json";
import GuyLottie from "../../assets/lotties/guy.json";
import Lottie from "lottie-react";
import "./DoExercisePage.css";
import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { fetchGetExerciseById } from "../../store/exercise";
import { fetchGetAllSessions, fetchSubmitAnswers } from "../../store/session";

function DoExercisePage() {
  const sessionUser = useSelector((state) => state.userSession?.user);
  const sessions = useSelector((state) => state.sessions?.sessions || []);
  const exercise = useSelector(
    (state) => state.exercises?.singleExercise?.exercise
  );
  const { exerciseId } = useParams();
  const [answers, setAnswers] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGetExerciseById(exerciseId));
    dispatch(fetchGetAllSessions());
  }, [dispatch, exerciseId]);

  const sessionId =
    sessions.length > 0 ? parseInt(sessions[sessions.length - 1].id, 10) : null;

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  const handleOptionChange = (questionId, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, selectedAnswer]) => ({
        questionId: parseInt(questionId, 10),
        selectedAnswer,
      })
    );

    try {
      await dispatch(
        fetchSubmitAnswers({ sessionId, answers: formattedAnswers })
      );
      alert("Answers submitted successfully!");
      navigate("/stats");
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };
  return (
    <main>
      <div className="exercise-todo-page">
        <h1>{exercise?.name}</h1>
        <section className="exercisePage-question-container">
          {exercise?.Questions?.length > 0 ? (
            exercise?.Questions?.map((question) => {
              return (
                <div className="question-box" key={question.id}>
                  <h2>{question.questionText}</h2>
                  <ul className="options-box">
                    {question.options.map((option, index) => (
                      <div className="radio-wrapper-32" key={index}>
                        <input
                          id={`question-${question.id}-option-${index}`}
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          onChange={() =>
                            handleOptionChange(question.id, option)
                          }
                        />
                        <label
                          htmlFor={`question-${question.id}-option-${index}`}
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </ul>
                </div>
              );
            })
          ) : (
            <p>No questions available</p>
          )}
        </section>
        <div className="submit-exercise-btn">
          <button
            type="button"
            onClick={handleSubmit}
            className="start-button submit-button"
          >
            Submit
          </button>
        </div>
        <div className="circular-waves lottie">
          <Lottie animationData={CircularWavesLottie} />
        </div>
        <div className="astro-ctn">
          <Lottie animationData={Astronauta} />
        </div>
        <div className="guy-ctn">
          <Lottie animationData={GuyLottie} />
        </div>
      </div>
    </main>
  );
}

export default DoExercisePage;
