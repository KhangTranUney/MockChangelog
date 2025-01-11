import { Platform, PermissionsAndroid } from 'react-native';
import { initializeFirebase } from '../services/firebase';
import { apiClient } from '../api/client';

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    return result === PermissionsAndroid.RESULTS.GRANTED;
  }
  const token = await initializeFirebase();
  if (token) {
    await apiClient.post('/devices/register', { pushToken: token });
    return true;
  }
  return false;
}
