import Const from './constant';
import { getStudentListApi, deleteStudentApi } from './apis';

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
