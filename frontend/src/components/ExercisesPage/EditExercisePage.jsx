import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BooksLottie from "../../assets/lotties/books.json";
import DogLottie from "../../assets/lotties/dogWithHeadphones.json";
import Lottie from "lottie-react";
import "./ExercisesPage.css";
import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import {
  fetchGetExerciseById,
  fetchUpdateExercise,
} from "../../store/exercise";
import { fetchUpdateQuestion } from "../../store/question";

function EditExercisePage() {
  const sessionUser = useSelector((state) => state.userSession?.user);
  const { exerciseId } = useParams();
  const exercise = useSelector(
    (state) => state.exercises?.singleExercise?.exercise
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState({});
  console.log("exerecise", exercise);
  console.log("correct");
  useEffect(() => {
    dispatch(fetchGetExerciseById(exerciseId));
  }, [dispatch, exerciseId]);

  useEffect(() => {
    setName(exercise?.name);
    setDescription(exercise?.description);
    setDifficulty(exercise?.difficulty);
    setType(exercise?.type);
    setQuestions(exercise?.Questions);
  }, [exercise]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  const handleQuestionChange = (id, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, questionText: value } : q))
    );
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((option, index) =>
                index === optionIndex ? value : option
              ),
            }
          : q
      )
    );
  };

  const handleCorrectAnswerChange = (questionId, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              correctAnswer: value,
            }
          : q
      )
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!difficulty) newErrors.difficulty = "Difficulty is required.";
    if (!type) newErrors.type = "Type is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const editedExercise = {
      name,
      description,
      difficulty,
      type,
    };

    try {
      await dispatch(fetchUpdateExercise(exerciseId, editedExercise));

      for (const question of questions) {
        await dispatch(
          fetchUpdateQuestion(exerciseId, question.id, {
            questionText: question.questionText,
            correctAnswer: question.correctAnswer,
            options: question.options,
          })
        );
      }
      alert("Exercise updated successfully");
      navigate(`/exercises`);
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };
  console.log("questions", questions);
  return (
    <div className="edit-exercises-page">
      <h1>Edit Exercise #{exerciseId}</h1>
      <form onSubmit={onSubmit}>
        <div className="name-container">
          <h2>Name</h2>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          {errors.name && <p className="errors">{errors.name}</p>}
        </div>
        <div className="description-container">
          <h2>Description</h2>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          {errors.description && <p className="errors">{errors.description}</p>}
        </div>
        <div className="difficulty-container">
          <h2>Difficulty</h2>
          <input
            id="difficulty"
            name="difficulty"
            type="text"
            placeholder="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          ></input>
          {errors.difficulty && <p className="errors">{errors.difficulty}</p>}
        </div>
        <div className="type-container">
          <h2>Type</h2>
          <input
            id="type"
            name="type"
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          ></input>
          {errors.type && <p className="errors">{errors.type}</p>}
        </div>
        <div className="questions-container">
          <h2>Questions</h2>
          {questions?.length > 0 ? (
            questions?.map((question, index) => {
              return (
                <div
                  className="editExercisePage-question-container"
                  key={question.id}
                >
                  <h3>Question #{index + 1}</h3>
                  <input
                    type="text"
                    placeholder="Question 1"
                    value={question.questionText}
                    onChange={(e) =>
                      handleQuestionChange(question.id, e.target.value)
                    }
                  ></input>
                  <h4>Options</h4>
                  <div className="options-container">
                    {question?.options?.length > 0 ? (
                      question.options.map((option, index) => (
                        <div className="option-box" key={index}>
                          <div className="radio-wrapper-32">
                            <input
                              id={`question-${question.id}-option-${index}`}
                              type="radio"
                              name={`question-${question.id}`}
                              value={option} // Radio button value is the option text.
                              checked={question.correctAnswer === option} // Checks if this is the correct answer.
                              onChange={(e) =>
                                handleCorrectAnswerChange(
                                  question.id,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <input
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option} // Option text input value.
                            onChange={(e) =>
                              handleOptionChange(
                                question.id,
                                index,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <p>No options available</p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Questions Available</p>
          )}
          {errors.questions && <p className="errors">{errors.questions}</p>}
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </div>
      </form>
      {/* <div className="dog lottie">
        <Lottie animationData={DogLottie} />
      </div>
      <div className="books lottie">
        <Lottie animationData={BooksLottie} />
      </div> */}
    </div>
  );
}

export default EditExercisePage;
