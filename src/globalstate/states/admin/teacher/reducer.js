import Const from './constant';

const initials = {
  teacherList: {
    data: { teacherList: [] },
    success: false,
    error: null,
    fetching: false
  },
  deleteTeacher: {
    fetching: false,
    error: null
  },
  addTeacher: {
    fetching: false,
    error: null
  },
  updateTeacher: {
    fetching: false,
    error: null
  },
  uploadTeacherExcel: {
    fetching: false,
    error: null
  },
  downloadTeacherExcel: {
    fetching: false,
    error: null
  }
};

export const teacherListReducer = (state = initials.teacherList, action) => {
  switch (action.type) {
    case Const.TEACHER_LIST_PENDING: {
      return {
        ...state,
        fetching: true
      };
    }
    case Const.TEACHER_LIST_FULFILLED: {
      return {
        data: { teacherList: action.payload },
        success: true,
        error: null,
        fetching: false
      };
    }
    case Const.TEACHER_LIST_REJECTED: {
      return {
        data: {},
        success: false,
        error: null,
        fetching: false
      };
    }
    default:
      return state;
  }
};

export const deleteTeacherReducer = (state = initials.deleteTeacher, action) => {
  switch (action.type) {
    case Const.DELETE_TEACHER_PENDING: {
      return {
        ...state,
        fetching: true
      };
    }
    case Const.DELETE_TEACHER_FULFILLED: {
      return {
        error: null,
        fetching: false
      };
    }
    case Const.DELETE_TEACHER_REJECTED: {
      return {
        error: action.payload,
        fetching: false
      };
    }
    default:
      return state;
  }
};

export const addTeacherReducer = (state = initials.addTeacher, action) => {
  switch (action.type) {
    case Const.ADD_TEACHER_PENDING: {
      return {
        ...state,
        fetching: true
      };
    }
    case Const.ADD_TEACHER_FULFILLED: {
      return {
        error: null,
        fetching: false
      };
    }
    case Const.ADD_TEACHER_REJECTED: {
      return {
        error: action.payload,
        fetching: false
      };
    }
    default:
      return state;
  }
};

export const updateTeacherReducer = (state = initials.updateTeacher, action) => {
  switch (action.type) {
    case Const.UPDATE_TEACHER_PENDING: {
      return {
        ...state,
        fetching: true
      };
    }
    case Const.UPDATE_TEACHER_FULFILLED: {
      return {
        error: null,
        fetching: false
      };
    }
    case Const.UPDATE_TEACHER_REJECTED: {
      return {
        error: action.payload,
        fetching: false
      };
    }
    default:
      return state;
  }
};

export const uploadTeacherExcelReducer = (
  state = initials.uploadTeacherExcel,
  action
) => {
  switch (action.type) {
    case Const.UPLOAD_TEACHER_EXCEL_PENDING:
      return {
        ...state,
        fetching: true
      };
    case Const.UPLOAD_TEACHER_EXCEL_FULFILLED:
      return {
        fetching: false,
        error: null
      };
    case Const.UPLOAD_TEACHER_EXCEL_REJECTED:
      return {
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const downloadTeacherExcelReducer = (
  state = initials.downloadTeacherExcel,
  action
) => {
  switch (action.type) {
    case Const.DOWNLOAD_TEACHER_EXCEL_PENDING:
      return {
        ...state,
        fetching: true
      };
    case Const.DOWNLOAD_TEACHER_EXCEL_FULFILLED:
      return {
        fetching: false,
        error: null
      };
    case Const.DOWNLOAD_TEACHER_EXCEL_REJECTED:
      return {
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }
};
