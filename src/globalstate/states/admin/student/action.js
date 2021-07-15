import axios from 'axios';
import Enums from 'src/libraries/enums';

export const STUDENT_LIST_PENDING = 'STUDENT_LIST_PENDING';
export const STUDENT_LIST_FULFILLED = 'STUDENT_LIST_FULFILLED';
export const STUDENT_LIST_REJECTED = 'STUDENT_LIST_REJECTED';

export const DELETE_STUDENT_PENDING = 'DELETE_STUDENT_PENDING';
export const DELETE_STUDENT_FULFILLED = 'DELETE_STUDENT_FULFILLED';
export const DELETE_STUDENT_REJECTED = 'DELETE_STUDENT_REJECTED';

export const getStudentList = () => async (dispatch) => {
  dispatch({
    type: STUDENT_LIST_PENDING
  });
  try {
    const response = await axios.get(`${Enums.SERVER_URL}/student`, {
      headers: {
        Authorization: localStorage.getItem('access_token')
      }
    });
    dispatch({
      type: STUDENT_LIST_FULFILLED,
      payload: response
    });
    return response;
  } catch (error) {
    dispatch({
      type: STUDENT_LIST_REJECTED,
      payload: error
    });
    return error;
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_STUDENT_PENDING
  });
  try {
    const response = await axios.delete(
      `${Enums.SERVER_URL}/student/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem('access_token')
        }
      }
    );
    dispatch({
      type: DELETE_STUDENT_FULFILLED,
      payload: response
    });
    return response;
  } catch (error) {
    dispatch({
      type: DELETE_STUDENT_REJECTED,
      payload: error
    });
    return error;
  }
};
