import axios from 'axios';

export const setupAxiosInterceptor = () => {
  const onRequestSuccess = (config) => {
    if (localStorage.getItem('access_token')) {
      config.headers.Authorization = localStorage.getItem('access_token');
    }
    /* axiosConfig.timeout = 60000; */
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

  axios.interceptors.request.use(
    (config) => onRequestSuccess(config),
    (err) => onRequestError(err)
  );
  axios.interceptors.response.use(
    (config) => onResponseSuccess(config),
    (err) => onResponseError(err)
  );
};
