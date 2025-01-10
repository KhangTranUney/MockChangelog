import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { navigate } from '../navigation/rootNavigation';

export function setupNotificationHandlers() {
  messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    console.log('Foreground notification:', remoteMessage.notification?.title);
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Background notification:', remoteMessage.data);
  });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (remoteMessage.data?.screen) {
      navigate(remoteMessage.data.screen as string);
    }
  });
}
