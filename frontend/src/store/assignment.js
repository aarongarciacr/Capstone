import { csrfFetch } from "./csrf";

const GET_ASSIGNMENTS = "assignments/GET_ASSIGNMENTS";
const GET_STUDENT_ASSIGNMENTS = "assignments/GET_STUDENT_ASSIGNMENTS";
const ASSIGN_EXERCISE = "assignments/ASSIGN_EXERCISE";
const DELETE_ASSIGNMENT = "assignments/DELETE_ASSIGNMENTS";

const getAssignments = (assignments) => ({
  type: GET_ASSIGNMENTS,
  assignments,
});

const getStudentAssignments = (studentId, assignments) => ({
  type: GET_STUDENT_ASSIGNMENTS,
  studentId,
  assignments,
});

const assignExercise = (assignment) => ({
  type: ASSIGN_EXERCISE,
  assignment,
});

const deleteAssignment = (assignmentId) => ({
  type: DELETE_ASSIGNMENT,
  assignmentId,
});

export const fetchGetAssignments = () => async (dispatch) => {
  const response = await csrfFetch("/api/assignments/");

  if (response.ok) {
    const assignments = await response.json();
    dispatch(getAssignments(assignments));
    return assignments;
  }
};
export const fetchAssignExercise =
  (exerciseId, studentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/exercises/${exerciseId}/assign`, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId }),
    });

    if (response.ok) {
      const assignment = await response.json();
      dispatch(assignExercise(assignment));
      return assignment;
    }
  };

export const fetchGetStudentAssignments = (studentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${studentId}/assignments/`);

  if (response.ok) {
    const assignments = await response.json();
    dispatch(getStudentAssignments(studentId, assignments));
    return assignments;
  }
};

export const fetchDeleteAssignment = (assignmentId) => async (dispatch) => {
  const response = await csrfFetch(`/api/assignments/${assignmentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteAssignment(assignmentId));
    return true;
  }
  return false;
};
export const fetchCompleteAssignment = (assignmentId) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/assignments/${assignmentId}/complete`,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    dispatch(deleteAssignment(assignmentId));
    return true;
  }
  return false;
};

const initialState = {};

const assignmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSIGNMENTS: {
      return { ...state, assignments: action.assignments };
    }
    case ASSIGN_EXERCISE: {
      return {
        ...state,
        assignments: [...(state.assignments || []), action.assignment],
      };
    }
    case GET_STUDENT_ASSIGNMENTS: {
      const { studentId, assignments } = action;
      return {
        ...state,
        studentAssignments: {
          ...state.studentAssignments,
          [studentId]: assignments,
        },
      };
    }
    case DELETE_ASSIGNMENT: {
      const newState = {
        ...state,
        assignments: state.assignments?.filter(
          (assignment) => assignment.id !== action.assignmentId
        ),
      };
      return newState;
    }
    default:
      return state;
  }
};

export default assignmentsReducer;
