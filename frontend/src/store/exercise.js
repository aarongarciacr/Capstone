import { csrfFetch } from "./csrf";

const GET_ALL_EXERCISES = "exercises/GET_ALL_EXERCISES";
const GET_EXERCISE = "exercises/GET_EXERCISE";
const START_EXERCISE = "exercises/START_EXERCISE";
const UPDATE_EXERCISE = "exercise/UPDATE_EXERCISE";
const DELETE_EXERCISE = "exercise/DELETE_EXERCISE";
const POST_EXERCISE = "exercise/POST_EXERCISE";

const getAllExercises = (exercises) => ({
  type: GET_ALL_EXERCISES,
  exercises,
});

const getExerciseById = (exerciseId, exercise) => ({
  type: GET_EXERCISE,
  exerciseId,
  exercise,
});

const startExercise = (exerciseId, session) => ({
  type: START_EXERCISE,
  session,
  exerciseId,
});

const updateExercise = (exerciseId, exercise) => ({
  type: UPDATE_EXERCISE,
  exerciseId,
  exercise,
});

const deleteExercise = (exerciseId) => ({
  type: DELETE_EXERCISE,
  exerciseId,
});

const postExercise = (exercise) => ({
  type: POST_EXERCISE,
  exercise,
});

export const fetchGetAllExercises = () => async (dispatch) => {
  const response = await csrfFetch("/api/exercises");

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllExercises(data.exercises));
    return data.exercises;
  }
};

export const fetchGetExerciseById = (exerciseId) => async (dispatch) => {
  const response = await csrfFetch(`/api/exercises/${exerciseId}`);

  if (response.ok) {
    const exercise = await response.json();
    dispatch(getExerciseById(exerciseId, exercise));
    return exercise;
  }
};

export const fetchStartExercise = (exerciseId) => async (dispatch) => {
  const response = await csrfFetch(`/api/exercises/${exerciseId}/start`, {
    method: "POST",
  });

  if (response.ok) {
    const session = await response.json();
    dispatch(startExercise(exerciseId, session));
    return session;
  }
};

export const fetchUpdateExercise =
  (exerciseId, exercise) => async (dispatch) => {
    const response = await csrfFetch(`/api/exercises/${exerciseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    });

    if (response.ok) {
      const exercise = await response.json();
      dispatch(updateExercise(exerciseId, exercise));
      return exercise;
    }
  };

export const fetchDeleteExercise = (exerciseId) => async (dispatch) => {
  const response = await csrfFetch(`/api/exercises/${exerciseId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteExercise(exerciseId));
  }
};

export const fetchPostExercise = (exercise) => async (dispatch) => {
  const response = await csrfFetch(`/api/exercises`, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exercise),
  });

  if (response.ok) {
    const newExercise = await response.json();
    dispatch(postExercise(newExercise));
    return newExercise;
  }
};

const initialState = {};

const exercisesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EXERCISES: {
      return { ...state, exercises: action.exercises };
    }
    case GET_EXERCISE: {
      return { ...state, singleExercise: action.exercise };
    }
    case START_EXERCISE: {
      return {
        ...state,
        sessions: { ...state.sessions, [action.exerciseId]: action.session },
      };
    }
    case POST_EXERCISE: {
      const { exercise } = action;
      return {
        ...state,
        exercises: {
          [exercise.id]: exercise,
          ...state.exercises,
        },
      };
    }
    case UPDATE_EXERCISE: {
      const { exercise, exerciseId } = action;
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [exerciseId]: exercise,
        },
        singleExercise:
          state.singleExercise?.id === exerciseId
            ? exercise
            : state.singleExercise,
      };
    }
    case DELETE_EXERCISE: {
      const { exerciseId } = action;
      return {
        ...state,
        exercises: state.exercises?.filter(
          (exercise) => exercise.id !== exerciseId
        ),
      };
    }
    default:
      return state;
  }
};

export default exercisesReducer;
