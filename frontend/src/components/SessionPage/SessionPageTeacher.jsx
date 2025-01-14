import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BooksLottie from "../../assets/lotties/books.json";
import DogLottie from "../../assets/lotties/dogWithHeadphones.json";
import Lottie from "lottie-react";
import "./SessionPage.css";
import { useEffect } from "react";
import { fetchGetSession } from "../../store/session";
import "react-multi-carousel/lib/styles.css";
import { useParams } from "react-router-dom";
import { fetchGetQuestions } from "../../store/question";

function SessionPageTeacher() {
  const { studentId, sessionId } = useParams();
  const sessionUser = useSelector((state) => state.userSession?.user);
  const session = useSelector((state) => state.sessions?.singleSession || {});
  const questions = useSelector((state) => state.questions?.questions);
  console.log(studentId, sessionId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchGetSession(parseInt(sessionId, 10)));
    }
  }, [dispatch, sessionId]);

  useEffect(() => {
    if (session?.Exercise?.id) {
      dispatch(fetchGetQuestions(session.Exercise.id));
    }
  }, [dispatch, session?.Exercise?.id]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <div className="session-page">
      <section className="session-container">
        <h1>Session Details</h1>

        <p>
          <strong>Exercise Name:</strong> {session?.Exercise?.name}
        </p>
        <p>
          <strong>Start Time:</strong>{" "}
          {new Date(session?.startTime).toLocaleString()}
        </p>
        <p>
          <strong>End Time:</strong>{" "}
          {new Date(session?.endTime).toLocaleString()}
        </p>
        <p>
          <strong>Score:</strong> {session?.score}
        </p>
        <p>
          <strong>Accuracy:</strong> {session?.accuracy}%
        </p>
      </section>
      <section className="sessionPage-exercise-container">
        <h1>Exercise Details</h1>

        <p>
          <strong>Exercise Type:</strong> {session?.Exercise?.type}
        </p>
        <p>
          <strong>Description:</strong> {session?.Exercise?.description}
        </p>

        <p>
          <strong>Difficulty:</strong> {session?.Exercise?.difficulty}
        </p>
      </section>
      <section className="sessionPage-questions-container">
        <h1>Questions</h1>
        {questions?.length > 0 ? (
          <ul>
            {questions.map((question) => {
              const answer = session?.Answers?.find(
                (ans) => ans.questionId === question.id
              );
              return (
                <li key={question.id}>
                  <p>
                    <strong>Question:</strong> {question.questionText}
                  </p>
                  <p>
                    <strong>Your answer:</strong>{" "}
                    {answer ? answer.selectedAnswer : "No answer provided"}
                  </p>
                  <p>
                    <strong>Correct:</strong> {answer?.isCorrect ? "Yes" : "No"}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No questions available for this exercise.</p>
        )}
      </section>
      <div className="dog lottie">
        <Lottie animationData={DogLottie} />
      </div>
      <div className="books lottie">
        <Lottie animationData={BooksLottie} />
      </div>
    </div>
  );
}

export default SessionPageTeacher;
