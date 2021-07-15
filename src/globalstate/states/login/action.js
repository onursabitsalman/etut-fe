import axios from 'axios';
import Enums from 'src/libraries/enums';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const login = (username, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_PENDING
  });
  try {
    const response = await axios.post(`${Enums.SERVER_URL}/auth/login`, {
      username,
      password
    });
    localStorage.setItem('access_token', response.headers.authorization);
    dispatch({
      type: LOGIN_FULFILLED,
      payload: response
    });
    return response;
  } catch (error) {
    dispatch({
      type: LOGIN_REJECTED,
      payload: error
    });
    return error;
  }
};
