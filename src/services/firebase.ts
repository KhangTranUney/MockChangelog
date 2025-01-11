import messaging from '@react-native-firebase/messaging';

export async function initializeFirebase() {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED;
  if (enabled) {
    const token = await messaging().getToken();
    return token;
  }
  return null;
}
