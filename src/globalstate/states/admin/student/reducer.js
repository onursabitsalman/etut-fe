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
  },
  addStudent: {
    data: {},
    success: false,
    fetching: false,
    error: null
  },
  updateStudent: {
    fetching: false,
    error: null
  },
  uploadStudentExcel: {
    fetching: false,
    error: null
  },
  downloadStudentExcel: {
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

export const addStudentReducer = (state = initials.addStudent, action) => {
  switch (action.type) {
    case Const.ADD_STUDENT_PENDING:
      return {
        ...state,
        fetching: true
      };
    case Const.ADD_STUDENT_FULFILLED:
      return {
        fetching: false,
        data: action.payload,
        error: null,
        success: true
      };
    case Const.ADD_STUDENT_REJECTED:
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

export const updateStudentReducer = (state = initials.updateStudent, action) => {
  switch (action.type) {
    case Const.UPDATE_STUDENT_PENDING:
      return {
        ...state,
        fetching: true
      };
    case Const.UPDATE_STUDENT_FULFILLED:
      return {
        fetching: false,
        error: null
      };
    case Const.UPDATE_STUDENT_REJECTED:
      return {
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const uploadStudentExcelReducer = (
  state = initials.uploadStudentExcel,
  action
) => {
  switch (action.type) {
    case Const.UPLOAD_STUDENT_EXCEL_PENDING:
      return {
        ...state,
        fetching: true
      };
    case Const.UPLOAD_STUDENT_EXCEL_FULFILLED:
      return {
        fetching: false,
        error: null
      };
    case Const.UPLOAD_STUDENT_EXCEL_REJECTED:
      return {
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const downloadStudentExcelReducer = (
  state = initials.downloadStudentExcel,
  action
) => {
  switch (action.type) {
    case Const.DOWNLOAD_STUDENT_EXCEL_PENDING:
      return {
        ...state,
        fetching: true
      };
    case Const.DOWNLOAD_STUDENT_EXCEL_FULFILLED:
      return {
        fetching: false,
        error: null
      };
    case Const.DOWNLOAD_STUDENT_EXCEL_REJECTED:
      return {
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};
