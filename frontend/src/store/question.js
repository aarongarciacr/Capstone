import { csrfFetch } from "./csrf";

const GET_QUESTIONS = "questions/GET_QUESTIONS";
const POST_QUESTIONS = "questions/POST_QUESTIONS";
const UPDATE_QUESTION = "questions/UPDATE_QUESTION";

const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

const addQuestions = (exerciseId, newQuestions) => ({
  type: POST_QUESTIONS,
  exerciseId,
  newQuestions,
});

const updateQuestion = (exerciseId, questionId, question) => ({
  type: UPDATE_QUESTION,
  exerciseId,
  question,
  questionId,
});

export const fetchGetQuestions = (exerciseId) => async (dispatch) => {
  const response = await csrfFetch(`/api/exercises/${exerciseId}/questions`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getQuestions(data.questions));
    return data.questions;
  }
};

export const fetchAddQuestions =
  (exerciseId, newQuestions) => async (dispatch) => {
    const response = await csrfFetch(`/api/exercises/${exerciseId}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestions),
    });

    if (response.ok) {
      const newQuestionsData = await response.json();
      dispatch(addQuestions(exerciseId, newQuestionsData.newQuestions));
      return newQuestionsData.newQuestions;
    }
  };

export const fetchUpdateQuestion =
  (exerciseId, questionId, question) => async (dispatch) => {
    const response = await csrfFetch(
      `/api/exercises/${exerciseId}/questions/${questionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      }
    );

    if (response.ok) {
      const updatedQuestion = await response.json();
      dispatch(updateQuestion(exerciseId, questionId, updatedQuestion));
      return updatedQuestion;
    }
  };

const initialState = {};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS: {
      return { ...state, questions: action.questions };
    }
    case POST_QUESTIONS: {
      return {
        ...state,
        questions: [...(state.questions || []), ...action.newQuestions],
      };
    }
    case UPDATE_QUESTION: {
      const { questionId, question } = action;
      return {
        ...state,
        questions: state.questions?.map((q) =>
          q.id === questionId ? { ...q, ...question } : q
        ),
      };
    }
    default:
      return state;
  }
};

export default questionsReducer;
