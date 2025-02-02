import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import userSessionReducer from "./user-session";
import statsReducer from "./user";
import sessionReducer from "./session";
import questionsReducer from "./question";
import assignmentsReducer from "./assignment";
import exercisesReducer from "./exercise";

const rootReducer = combineReducers({
  userSession: userSessionReducer,
  stats: statsReducer,
  sessions: sessionReducer,
  questions: questionsReducer,
  assignments: assignmentsReducer,
  exercises: exercisesReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
