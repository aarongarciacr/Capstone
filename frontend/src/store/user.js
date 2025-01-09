import { csrfFetch } from "./csrf";

const GET_STATS = "user/GET_STATS";

const getStats = (stats) => ({
  type: GET_STATS,
  stats,
});

export const fetchGetStats = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/stats`);

  if (response.ok) {
    const stats = await response.json();
    dispatch(getStats(stats));
    return stats;
  }
};

const initialState = { stats: null };

const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATS: {
      return { ...state, stats: action.stats };
    }
    default:
      return state;
  }
};

export default statsReducer;
