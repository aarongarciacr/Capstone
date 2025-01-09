import { csrfFetch } from "./csrf";

const GET_ALL_SESSIONS = "sessions/GET_ALL_SESSIONS";

const getAllSessions = (sessions) => ({
  type: GET_ALL_SESSIONS,
  sessions,
});

export const fetchGetAllSessions = () => async (dispatch) => {
  const response = await csrfFetch(`/api/sessions/`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllSessions(data.sessions));
    return data.sessions;
  }
};

const initialState = { sessions: null };

const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SESSIONS: {
      return { ...state, sessions: action.sessions };
    }
    default:
      return state;
  }
};

export default sessionsReducer;
