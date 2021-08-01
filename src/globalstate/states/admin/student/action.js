import axios from 'axios';
import Enums from 'src/libraries/enums';

import Const from './constant';

export const getStudentList = () => async (dispatch) => {
  dispatch({ type: Const.STUDENT_LIST_PENDING });
  try {
    const { data } = await axios.get(`${Enums.SERVER_URL}/student`);
    dispatch({
      type: Const.STUDENT_LIST_FULFILLED,
      payload: data
    });
    return Promise.resolve(data);
  } catch (error) {
    dispatch({
      type: Const.STUDENT_LIST_REJECTED,
      payload: error.response.data.error
    });
    return Promise.reject();
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  dispatch({ type: Const.DELETE_STUDENT_PENDING });
  try {
    await axios.delete(`${Enums.SERVER_URL}/student/${id.join(',')}`);
    dispatch({ type: Const.DELETE_STUDENT_FULFILLED });
    dispatch(getStudentList());
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: Const.DELETE_STUDENT_REJECTED, payload: error.response.data.error });
    return Promise.reject();
  }
};

export const addStudent = (submitData) => async (dispatch) => {
  dispatch({ type: Const.ADD_STUDENT_PENDING });
  try {
    await axios.post(`${Enums.SERVER_URL}/student`, submitData);
    dispatch({ type: Const.ADD_STUDENT_FULFILLED });
    dispatch(getStudentList());
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: Const.ADD_STUDENT_REJECTED, payload: error.response.data.error });
    return Promise.reject();
  }
};

export const updateStudent = (submitData) => async (dispatch) => {
  dispatch({ type: Const.UPDATE_STUDENT_PENDING });
  try {
    await axios.put(`${Enums.SERVER_URL}/student`, submitData);
    dispatch({ type: Const.UPDATE_STUDENT_FULFILLED });
    dispatch(getStudentList());
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: Const.UPDATE_STUDENT_REJECTED });
    return Promise.reject();
  }
};

export const uploadStudentExcel = (file) => async (dispatch) => {
  dispatch({ type: Const.UPLOAD_STUDENT_EXCEL_PENDING });
  try {
    await axios.post(`${Enums.SERVER_URL}/student/import`, file, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    dispatch({ type: Const.UPLOAD_STUDENT_EXCEL_FULFILLED });
    dispatch(getStudentList());
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: Const.UPLOAD_STUDENT_EXCEL_REJECTED,
      payload: error.response.data.errorMessage
    });
    return Promise.reject();
  }
};

export const downloadStudentExcel = () => async (dispatch) => {
  dispatch({ type: Const.DOWNLOAD_STUDENT_EXCEL_PENDING });
  try {
    const response = await axios.get(`${Enums.SERVER_URL}/student/export`, {
      responseType: 'blob'
    });
    dispatch({ type: Const.DOWNLOAD_STUDENT_EXCEL_FULFILLED });
    return Promise.resolve(response);
  } catch (error) {
    dispatch({
      type: Const.DOWNLOAD_STUDENT_EXCEL_REJECTED,
      payload: error.response.data.errorMessage || 'errorMessage ekletilecek'
    });
    return Promise.reject();
  }
};
