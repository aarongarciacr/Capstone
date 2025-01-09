import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};
export const thunkLogin = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/userSession", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const thunkSignup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password, role } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
      role,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const thunkLogout = () => async (dispatch) => {
  const response = await csrfFetch("/api/userSession", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/userSession");

  const data = await response.json();

  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const userSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userSessionReducer;
