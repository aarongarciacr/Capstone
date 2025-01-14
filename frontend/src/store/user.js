import { csrfFetch } from "./csrf";

const GET_STATS = "user/GET_STATS";
const GET_STUDENTS = "users/GET_STUDENTS";

const getStats = (stats) => ({
  type: GET_STATS,
  stats,
});

const getStudents = (students) => ({
  type: GET_STUDENTS,
  students,
});

export const fetchGetStats = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/stats`);

  if (response.ok) {
    const stats = await response.json();
    dispatch(getStats(stats));
    return stats;
  }
};
export const fetchGetStudents = () => async (dispatch) => {
  const response = await csrfFetch("/api/users/students");

  if (response.ok) {
    const students = await response.json();
    dispatch(getStudents(students));
    return students;
  }
};

const initialState = { stats: null };

const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATS: {
      return { ...state, stats: action.stats };
    }
    case GET_STUDENTS: {
      return { ...state, students: action.students };
    }
    default:
      return state;
  }
};

export default statsReducer;
