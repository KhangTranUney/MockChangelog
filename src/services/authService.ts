import { apiClient } from '../api/client';
import { TokenStorage } from '../utils/tokenStorage';

export class AuthService {
  static async login(email: string, password: string) {
    const response = await apiClient.post('/auth/login', { email, password });
    await TokenStorage.setAccessToken(response.data.accessToken);
    await TokenStorage.setRefreshToken(response.data.refreshToken);
    return response.data.user;
  }

  static async logout() {
    await TokenStorage.clearAll();
  }

  static async refreshToken() {
    const refresh = await TokenStorage.getRefreshToken();
    const response = await apiClient.post('/auth/refresh', { refreshToken: refresh });
    await TokenStorage.setAccessToken(response.data.accessToken);
    return response.data.accessToken;
  }
}
