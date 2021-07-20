import axios from 'axios';
import Enums from 'src/libraries/enums';

import Const from './constant';

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: Const.LOGIN_PENDING });
  try {
    const { headers } = await axios.post(`${Enums.SERVER_URL}/auth/login`, {
      username,
      password
    });
    dispatch({ type: Const.LOGIN_FULFILLED });
    localStorage.setItem('access_token', headers.authorization);
    return Promise.resolve(headers);
  } catch (error) {
    /* TODO: yanlış kullanıcı adı ve şifrede error.response.data içinde message gelsin */
    dispatch({
      type: Const.LOGIN_REJECTED,
      payload: error.response.data || 'Kullanıcı Adı veya Şifre hatalı'
    });
    return Promise.reject(error.response.data || 'Kullanıcı Adı veya Şifre hatalı');
  }
};
