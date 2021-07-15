import {
  STUDENT_LIST_FULFILLED,
  STUDENT_LIST_REJECTED,
  STUDENT_LIST_PENDING,
  DELETE_STUDENT_FULFILLED,
  DELETE_STUDENT_REJECTED,
  DELETE_STUDENT_PENDING
} from './action';

const initialState = {
  data: {
    studentList: []
  },
  success: false,
  fetching: false,
  error: null
};

export const studentListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STUDENT_LIST_PENDING:
      return {
        ...state,
        fetching: true
      };

    case STUDENT_LIST_FULFILLED:
      console.log('payload.data: ', payload.data);
      return {
        fetching: false,
        data: {
          studentList: payload.data
        },
        error: null,
        success: true
      };

    case STUDENT_LIST_REJECTED:
      return {
        fetching: false,
        data: {
          studentList: []
        },
        error: payload,
        success: false
      };
    default:
      return state;
  }
};
const deleteStudentInitialState = {
  data: {},
  success: false,
  fetching: false,
  error: null
};

export const deleteStudentReducer = (
  state = deleteStudentInitialState,
  { type, payload }
) => {
  switch (type) {
    case DELETE_STUDENT_PENDING:
      return {
        ...state,
        fetching: true
      };

    case DELETE_STUDENT_FULFILLED:
      console.log('payload.data: ', payload.data);
      return {
        fetching: false,
        data: {},
        error: null,
        success: true
      };

    case DELETE_STUDENT_REJECTED:
      return {
        fetching: false,
        data: {},
        error: payload,
        success: false
      };
    default:
      return state;
  }
};
