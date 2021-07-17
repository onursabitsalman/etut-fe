import axios from 'axios';
import Enums from 'src/libraries/enums';

export const getStudentListApi = async () => {
  try {
    const { data } = await axios.get(`${Enums.SERVER_URL}/student`, {
      headers: {
        Authorization: localStorage.getItem('access_token')
      }
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const deleteStudentApi = async (ids) => {
  try {
    const { data } = await axios.delete(`${Enums.SERVER_URL}/student/${ids.join(',')}`, {
      headers: {
        Authorization: localStorage.getItem('access_token')
      }
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
