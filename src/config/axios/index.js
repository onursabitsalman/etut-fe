import axios from 'axios';

const setupAxiosInterceptor = () => {
  const onRequestSuccess = (config) => {
    const axiosConfig = config;
    if (!axiosConfig) return axiosConfig;
    if (localStorage.getItem('access_token')) {
      axiosConfig.headers.Authorization = localStorage.getItem('access_token');
    }
    axiosConfig.timeout = 60000;
    return config;
  };

  const onRequestError = (error) => {
    return Promise.reject(error);
  };

  const onResponseSuccess = (response) => {
    return response;
  };

  const onResponseError = (error) => {
    return Promise.reject(error);
  };

  axios.interceptors.request.use(onRequestSuccess(), onRequestError());
  axios.interceptors.response.use(onResponseSuccess(), onResponseError());
};

export default setupAxiosInterceptor;
