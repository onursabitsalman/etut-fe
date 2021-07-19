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

export const addStudentApi = async (submitData) => {
  try {
    const { data } = await axios.post(`${Enums.SERVER_URL}/student`, submitData, {
      headers: { Authorization: localStorage.getItem('access_token') }
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const uploadExcelApi = async (file) => {
  try {
    const { data } = await axios.post(`${Enums.SERVER_URL}/student/import`, file, {
      headers: {
        Authorization: localStorage.getItem('access_token'),
        'Content-Type': 'multipart/form-data'
      }
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export const downloadExcelApi = async () => {
  try {
    const { data } = await axios.get(`${Enums.SERVER_URL}/student/export`, {
      responseType: 'blob',
      headers: {
        Authorization: localStorage.getItem('access_token')
      }
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};
