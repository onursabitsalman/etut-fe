import axios from 'axios';
import Enums from 'src/libraries/enums';
import Const from './constant';

export const getTeacherList = () => async (dispatch) => {
  dispatch({ type: Const.TEACHER_LIST_PENDING });
  try {
    const { data } = await axios.get(`${Enums.SERVER_URL}/teacher`);
    dispatch({ type: Const.TEACHER_LIST_FULFILLED, payload: data });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: Const.TEACHER_LIST_REJECTED, payload: error.response.data.message });
    return Promise.reject();
  }
};

export const deleteTeacher = (ids) => async (dispatch) => {
  dispatch({ type: Const.DELETE_TEACHER_PENDING });
  try {
    await axios.delete(`${Enums.SERVER_URL}/teacherrr/${ids.join(',')}`);
    dispatch({ type: Const.DELETE_TEACHER_FULFILLED });
    dispatch(getTeacherList());
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: Const.DELETE_TEACHER_REJECTED,
      payload: error.response.data.error || 'errorMessage ekletilecek'
    });
    return Promise.reject();
  }
};

export const addTeacher = (submitData) => async (dispatch) => {
  dispatch({ type: Const.ADD_TEACHER_PENDING });
  try {
    await axios.post(`${Enums.SERVER_URL}/teacher`, submitData);
    dispatch({ type: Const.ADD_TEACHER_FULFILLED });
    dispatch(getTeacherList());
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: Const.ADD_TEACHER_REJECTED, payload: error.response.data.message });
    return Promise.reject();
  }
};

export const updateTeacher = (submitData) => async (dispatch) => {
  dispatch({ type: Const.UPDATE_TEACHER_PENDING });
  try {
    await axios.put(`${Enums.SERVER_URL}/teacher`, submitData);
    dispatch({ type: Const.UPDATE_TEACHER_FULFILLED });
    dispatch(getTeacherList());
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: Const.UPDATE_TEACHER_REJECTED,
      payload: error.response.data.message
    });
    return Promise.reject();
  }
};

export const uploadTeacherExcel = (file) => async (dispatch) => {
  dispatch({ type: Const.UPLOAD_TEACHER_EXCEL_PENDING });
  try {
    await axios.post(`${Enums.SERVER_URL}/teacher/import`, file, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    dispatch({ type: Const.UPLOAD_TEACHER_EXCEL_FULFILLED });
    dispatch(getTeacherList());
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: Const.UPLOAD_TEACHER_EXCEL_REJECTED,
      payload: error.response.data.errorMessage
    });
    return Promise.reject();
  }
};

export const downloadTeacherExcel = () => async (dispatch) => {
  dispatch({ type: Const.DOWNLOAD_TEACHER_EXCEL_PENDING });
  try {
    const response = await axios.get(`${Enums.SERVER_URL}/teacher/export`, {
      responseType: 'blob'
    });
    dispatch({ type: Const.DOWNLOAD_TEACHER_EXCEL_FULFILLED });
    return Promise.resolve(response);
  } catch (error) {
    console.log('error: ', error.response);
    dispatch({
      type: Const.DOWNLOAD_TEACHER_EXCEL_REJECTED,
      payload: error.response.data.message || 'Hata mesajı ekletilecek'
    });
    return Promise.reject();
  }
};
