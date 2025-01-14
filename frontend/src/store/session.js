import { csrfFetch } from "./csrf";

const GET_ALL_SESSIONS = "sessions/GET_ALL_SESSIONS";
const GET_SESSIONS_BY_USER_ID = "sessions/GET_SESSION_BY_USER_ID";
const GET_SESSION = "sessions/GET_SESSION";
const SUBMIT_ANSWERS = "sessions/SUBMIT_ANSWERS";

const getAllSessions = (sessions) => ({
  type: GET_ALL_SESSIONS,
  sessions,
});

const getSessionByUserId = (userId, sessions) => ({
  type: GET_SESSIONS_BY_USER_ID,
  userId,
  sessions,
});

const getSession = (sessionId, session) => ({
  type: GET_SESSION,
  session,
  sessionId,
});

const submitAnswers = (answers) => ({
  type: SUBMIT_ANSWERS,
  answers,
});

export const fetchGetAllSessions = () => async (dispatch) => {
  const response = await csrfFetch(`/api/sessions/`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllSessions(data.sessions));
    return data.sessions;
  }
};

export const fetchGetSessionsByUserId = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/sessions`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getSessionByUserId(userId, data.sessions));
    return data.sessions;
  }
};

export const fetchGetSession = (sessionId) => async (dispatch) => {
  const response = await csrfFetch(`/api/sessions/${sessionId}`);

  if (response.ok) {
    const session = await response.json();
    dispatch(getSession(sessionId, session));
    return session;
  }
};

export const fetchSubmitAnswers =
  ({ sessionId, answers }) =>
  async (dispatch) => {
    const response = await csrfFetch(`/api/sessions/${sessionId}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(submitAnswers(data));
      return data;
    }
  };

const initialState = { sessions: null };

const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SESSIONS: {
      return { ...state, sessions: action.sessions };
    }
    case GET_SESSIONS_BY_USER_ID: {
      const { userId, sessions } = action;
      return {
        ...state,
        userSessions: {
          ...state.userSessions,
          [userId]: sessions,
        },
      };
    }

    case GET_SESSION: {
      return { ...state, singleSession: action.session };
    }
    case SUBMIT_ANSWERS: {
      return { ...state, answers: action.answers };
    }
    default:
      return state;
  }
};

export default sessionsReducer;
