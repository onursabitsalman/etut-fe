import Const from './constant';

const initials = {
  studentList: {
    data: { studentList: [] },
    success: false,
    fetching: false,
    error: null
  },
  deleteStudent: {
    data: {},
    success: false,
    fetching: false,
    error: null
  }
};

export const studentListReducer = (state = initials.studentList, action) => {
  switch (action.type) {
    case Const.STUDENT_LIST_PENDING:
      return {
        ...state,
        fetching: true
      };
    case Const.STUDENT_LIST_FULFILLED:
      return {
        fetching: false,
        data: { studentList: action.payload },
        error: null,
        success: true
      };
    case Const.STUDENT_LIST_REJECTED:
      return {
        fetching: false,
        data: { studentList: [] },
        error: action.payload,
        success: false
      };
    default:
      return state;
  }
};

export const deleteStudentReducer = (state = initials.deleteStudent, action) => {
  switch (action.type) {
    case Const.DELETE_STUDENT_PENDING:
      return {
        ...state,
        fetching: true
      };
    case Const.DELETE_STUDENT_FULFILLED:
      return {
        fetching: false,
        data: {},
        error: null,
        success: true
      };
    case Const.DELETE_STUDENT_REJECTED:
      return {
        fetching: false,
        data: {},
        error: action.payload,
        success: false
      };
    default:
      return state;
  }
};
