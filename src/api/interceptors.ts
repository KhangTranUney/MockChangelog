import { apiClient } from './client';
import { TokenStorage } from '../utils/tokenStorage';
import { AuthService } from '../services/authService';

apiClient.interceptors.request.use(async config => {
  const token = await TokenStorage.getAccessToken();
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const newToken = await AuthService.refreshToken();
      error.config.headers.Authorization = 'Bearer ' + newToken;
      return apiClient.request(error.config);
    }
    return Promise.reject(error);
  }
);
