import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hrica.skyro.dev/api/v1',
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post('https://hrica.skyro.dev/api/v1/auth/refresh', {
          refresh_token: localStorage.getItem('refresh_token')
        });
        localStorage.setItem('access_token', res.data.accessToken);
        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;