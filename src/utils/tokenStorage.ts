import EncryptedStorage from 'react-native-encrypted-storage';

export class TokenStorage {
  private static ACCESS_KEY = 'access_token';
  private static REFRESH_KEY = 'refresh_token';

  static async setAccessToken(token: string) {
    await EncryptedStorage.setItem(this.ACCESS_KEY, token);
  }

  static async getAccessToken(): Promise<string | null> {
    return EncryptedStorage.getItem(this.ACCESS_KEY);
  }

  static async setRefreshToken(token: string) {
    await EncryptedStorage.setItem(this.REFRESH_KEY, token);
  }

  static async getRefreshToken(): Promise<string | null> {
    return EncryptedStorage.getItem(this.REFRESH_KEY);
  }

  static async clearAll() {
    await EncryptedStorage.clear();
  }
}
