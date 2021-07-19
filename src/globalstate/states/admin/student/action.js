import Const from './constant';
import {
  getStudentListApi,
  deleteStudentApi,
  addStudentApi,
  uploadExcelApi,
  downloadExcelApi
} from './apis';

export const getStudentList = () => (dispatch) => {
  dispatch({ type: Const.STUDENT_LIST_PENDING });
  getStudentListApi()
    .then((response) => {
      dispatch({
        type: Const.STUDENT_LIST_FULFILLED,
        payload: response
      });
    })
    .catch((error) => {
      dispatch({
        type: Const.STUDENT_LIST_REJECTED,
        payload: error
      });
    });
};

export const deleteStudent = (id) => (dispatch) => {
  dispatch({ type: Const.DELETE_STUDENT_PENDING });
  deleteStudentApi(id)
    .then((response) => {
      dispatch({
        type: Const.DELETE_STUDENT_FULFILLED,
        payload: response
      });
      dispatch(getStudentList());
    })
    .catch((error) => {
      dispatch({
        type: Const.DELETE_STUDENT_REJECTED,
        payload: error
      });
    });
};

export const addStudent = (submitData) => (dispatch) => {
  dispatch({ type: Const.ADD_STUDENT_PENDING });
  return addStudentApi(submitData)
    .then((response) => {
      dispatch({
        type: Const.ADD_STUDENT_FULFILLED,
        payload: response
      });
      dispatch(getStudentList());
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch({
        type: Const.ADD_STUDENT_REJECTED,
        payload: error
      });
      return Promise.reject();
    });
};

export const uploadStudentExcel = (file) => (dispatch) => {
  dispatch({ type: Const.UPLOAD_STUDENT_EXCEL_PENDING });
  return uploadExcelApi(file)
    .then((response) => {
      dispatch({ type: Const.UPLOAD_STUDENT_EXCEL_FULFILLED });
      dispatch(getStudentList());
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch({
        type: Const.UPLOAD_STUDENT_EXCEL_REJECTED,
        payload: error
      });
      return Promise.reject();
    });
};

export const downloadStudentExcel = () => (dispatch) => {
  dispatch({ type: Const.DOWNLOAD_STUDENT_EXCEL_PENDING });
  return downloadExcelApi()
    .then((response) => {
      dispatch({ type: Const.DOWNLOAD_STUDENT_EXCEL_FULFILLED });
      return Promise.resolve(response);
    })
    .catch((error) => {
      dispatch({
        type: Const.DOWNLOAD_STUDENT_EXCEL_REJECTED,
        payload: error
      });
      return Promise.reject(error);
    });
};
