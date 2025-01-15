import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchGetExerciseById,
  fetchUpdateExercise,
  fetchGetAllExercises,
} from "../../store/exercise";
import { fetchUpdateQuestion } from "../../store/question";
import "./EditExercisePage.css";
import { useModal } from "../../context/Modal";

function EditExercisePage({ exerciseId }) {
  const sessionUser = useSelector((state) => state.userSession?.user);
  const { closeModal } = useModal();
  const exercise = useSelector(
    (state) => state.exercises?.singleExercise?.exercise
  );
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchGetExerciseById(exerciseId));
  }, [dispatch, exerciseId]);

  useEffect(() => {
    if (exercise) {
      setName(exercise.name || "");
      setDescription(exercise.description || "");
      setDifficulty(exercise.difficulty || "");
      setType(exercise.type || "");
      setQuestions(
        exercise.Questions || [
          { questionText: "", correctAnswer: "", options: ["", "", ""] },
        ]
      );
    }
  }, [exercise]);

  if (!sessionUser) return <Navigate to="/" replace={true} />;

  const handleQuestionChange = (index, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, questionText: value } : q))
    );
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              options: q.options.map((opt, optIndex) =>
                optIndex === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === questionIndex ? { ...q, correctAnswer: value } : q
      )
    );
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { questionText: "", correctAnswer: "", options: ["", "", ""] },
    ]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!difficulty) newErrors.difficulty = "Difficulty is required.";
    if (!type) newErrors.type = "Type is required.";
    if (questions.some((q) => q.questionText === ""))
      newErrors.questions = "All questions must have text.";
    if (questions.some((q) => q.correctAnswer === ""))
      newErrors.correctAnswer = "All questions must have a correct answer.";
    if (questions.some((q) => q.options.some((opt) => opt === "")))
      newErrors.options = "All questions must have options filled.";

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
      await dispatch(fetchGetAllExercises());

      alert("Exercise updated successfully");
      closeModal();
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };

  return (
    <div className="edit-exercise-modal">
      <h1>Edit Exercise</h1>
      <form onSubmit={onSubmit} className="form-container">
        <div className="input-container">
          <h2>Name</h2>
          <input
            type="text"
            placeholder="Exercise Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="input-container">
          <h2>Description</h2>
          <textarea
            placeholder="Exercise Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div className="input-container">
          <h2>Difficulty</h2>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value={"Beginner"}>Beginner</option>
            <option value={"Intermediate"}>Intermediate</option>

            <option value={"Advanced"}>Advanced</option>
          </select>

          {errors.difficulty && <p className="error">{errors.difficulty}</p>}
        </div>
        <div className="input-container">
          <h2>Type</h2>
          <input
            type="text"
            placeholder="Exercise Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          {errors.type && <p className="error">{errors.type}</p>}
        </div>
        <div className="questions-container">
          <h2>Questions</h2>
          {questions.map((question, qIndex) => (
            <div className="editExercise-question-box" key={qIndex}>
              <input
                type="text"
                placeholder={`Question ${qIndex + 1}`}
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              />
              <div className="options-container">
                <h4>Options</h4>
                {question.options.map((option, oIndex) => (
                  <div className="option-box" key={oIndex}>
                    <input
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
              <h4>Correct Answer</h4>
              <select
                value={question.correctAnswer}
                onChange={(e) =>
                  handleCorrectAnswerChange(qIndex, e.target.value)
                }
              >
                <option value="">Select Correct Answer</option>
                {question.options.map((option, oIndex) => (
                  <option key={oIndex} value={option}>
                    {option || `Option ${oIndex + 1}`}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="start-button">
            Add Question
          </button>
        </div>
        {errors.questions && <p className="error">{errors.questions}</p>}
        {errors.correctAnswer && (
          <p className="error">{errors.correctAnswer}</p>
        )}
        {errors.options && <p className="error">{errors.options}</p>}
        <div className="last-button">
          <button type="submit" className="start-button">
            Save Exercise
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditExercisePage;
