import axios from 'axios';
import Enums from 'src/libraries/enums';

export const loginApi = async (username, password) => {
  try {
    const { headers } = await axios.post(`${Enums.SERVER_URL}/auth/login`, {
      username,
      password
    });
    return Promise.resolve(headers);
  } catch (error) {
    return Promise.reject(error.response.data || 'Kullanıcı Adı veya Şifre hatalı');
  }
};
