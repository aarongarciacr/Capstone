import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { fetchGetAllExercises, fetchPostExercise } from "../../store/exercise";
import { useModal } from "../../context/Modal";
// import "./CreateExerciseModal.css";

function CreateExerciseModel({ navigate }) {
  const sessionUser = useSelector((state) => state.userSession?.user);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", correctAnswer: "", options: ["", "", ""] },
  ]);
  const [errors, setErrors] = useState({});

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

    const newExercise = {
      name,
      description,
      difficulty,
      type,
      questions,
    };

    try {
      await dispatch(fetchPostExercise(newExercise));
      await dispatch(fetchGetAllExercises());
      alert("Exercise created successfully!");

      navigate("/exercises");
      closeModal();
    } catch (error) {
      console.error("Error creating exercise:", error);
    }
  };

  return (
    <div className="create-exercise-modal">
      <h1>Create New Exercise</h1>
      <form onSubmit={onSubmit}>
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
          <input
            type="text"
            placeholder="Difficulty (Beginner, Intermediate, Advanced)"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
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
            <div className="question-box" key={qIndex}>
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
          <button type="button" onClick={addQuestion}>
            Add Question
          </button>
        </div>
        {errors.questions && <p className="error">{errors.questions}</p>}
        {errors.correctAnswer && (
          <p className="error">{errors.correctAnswer}</p>
        )}
        {errors.options && <p className="error">{errors.options}</p>}
        <button type="submit" className="submit-button">
          Create Exercise
        </button>
      </form>
    </div>
  );
}

export default CreateExerciseModel;
