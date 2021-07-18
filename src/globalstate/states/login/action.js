import Const from './constant';
import { loginApi } from './apis';

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: Const.LOGIN_PENDING });
  return loginApi(username, password)
    .then((response) => {
      dispatch({
        type: Const.LOGIN_FULFILLED,
        payload: response
      });
      localStorage.setItem('access_token', response.authorization);
      return Promise.resolve(response);
    })
    .catch((error) => {
      console.log('error: ', error);
      dispatch({
        type: Const.LOGIN_REJECTED,
        payload: error
      });
      return Promise.reject(error);
    });
};
