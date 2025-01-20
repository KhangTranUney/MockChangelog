import crashlytics from '@react-native-firebase/crashlytics';

export class CrashReporting {
  static initialize() {
    crashlytics().setCrashlyticsCollectionEnabled(true);
  }

  static setUser(userId: string) {
    crashlytics().setUserId(userId);
  }

  static recordError(error: Error, context?: Record<string, string | undefined>) {
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        if (value) crashlytics().setAttribute(key, value);
      });
    }
    crashlytics().recordError(error);
  }

  static log(message: string) {
    crashlytics().log(message);
  }
}
