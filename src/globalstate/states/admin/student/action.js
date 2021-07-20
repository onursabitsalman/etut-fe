import axios from 'axios';
import Enums from 'src/libraries/enums';

import Const from './constant';

export const getStudentList = () => async (dispatch) => {
  dispatch({ type: Const.STUDENT_LIST_PENDING });
  try {
    const { data } = await axios.get(`${Enums.SERVER_URL}/student`, {
      headers: {
        Authorization: localStorage.getItem('access_token')
      }
    });
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
    return Promise.reject(error.response.data.error);
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  dispatch({ type: Const.DELETE_STUDENT_PENDING });
  try {
    await axios.delete(`${Enums.SERVER_URL}/student/${id.join(',')}`, {
      headers: {
        Authorization: localStorage.getItem('access_token')
      }
    });
    dispatch({ type: Const.DELETE_STUDENT_FULFILLED });
    dispatch(getStudentList());
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: Const.DELETE_STUDENT_REJECTED, payload: error.response.data.error });
    return Promise.reject(error.response.data.error);
  }
};

export const addStudent = (submitData) => async (dispatch) => {
  dispatch({ type: Const.ADD_STUDENT_PENDING });
  try {
    await axios.post(`${Enums.SERVER_URL}/student`, submitData, {
      headers: { Authorization: localStorage.getItem('access_token') }
    });
    dispatch({ type: Const.ADD_STUDENT_FULFILLED });
    dispatch(getStudentList());
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: Const.ADD_STUDENT_REJECTED, payload: error.response.data.error });
    return Promise.reject(error.response.data.error);
  }
};

export const updateStudent = (submitData) => async (dispatch) => {
  dispatch({ type: Const.UPDATE_STUDENT_PENDING });
  try {
    const { data } = await axios.put(`${Enums.SERVER_URL}/student`, submitData, {
      headers: { Authorization: localStorage.getItem('access_token') }
    });
    dispatch({ type: Const.UPDATE_STUDENT_FULFILLED });
    dispatch(getStudentList());
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: Const.UPDATE_STUDENT_REJECTED });
    return Promise.reject(error.response.data.error);
  }
};

export const uploadStudentExcel = (file) => async (dispatch) => {
  dispatch({ type: Const.UPLOAD_STUDENT_EXCEL_PENDING });
  try {
    await axios.post(`${Enums.SERVER_URL}/student/import`, file, {
      headers: {
        Authorization: localStorage.getItem('access_token'),
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch({ type: Const.UPLOAD_STUDENT_EXCEL_FULFILLED });
    dispatch(getStudentList());
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: Const.UPLOAD_STUDENT_EXCEL_FULFILLED });
    return Promise.reject(error.response.data.error);
  }
};

export const downloadStudentExcel = () => async (dispatch) => {
  dispatch({ type: Const.DOWNLOAD_STUDENT_EXCEL_PENDING });
  try {
    const response = await axios.get(`${Enums.SERVER_URL}/student/export`, {
      responseType: 'blob',
      headers: {
        Authorization: localStorage.getItem('access_token')
      }
    });
    dispatch({ type: Const.DOWNLOAD_STUDENT_EXCEL_FULFILLED });
    return Promise.resolve(response);
  } catch (error) {
    dispatch({
      type: Const.DOWNLOAD_STUDENT_EXCEL_REJECTED,
      payload: error
    });
    return Promise.reject(error.response.data.error);
  }
};
