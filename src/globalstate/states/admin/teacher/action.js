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
    await axios.delete(`${Enums.SERVER_URL}/teacher/${ids.join(',')}`);
    dispatch({ type: Const.DELETE_TEACHER_FULFILLED });
    dispatch(getTeacherList());
    return Promise.resolve();
  } catch (error) {
    dispatch({
      type: Const.DELETE_TEACHER_REJECTED,
      payload: error.response.data.message
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
