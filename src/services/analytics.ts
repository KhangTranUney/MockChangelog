import analytics from '@react-native-firebase/analytics';

interface AnalyticsEvent { name: string; params?: Record<string, string | number>; }

class AnalyticsService {
  private queue: AnalyticsEvent[] = [];
  private flushInterval: NodeJS.Timeout | null = null;

  initialize() {
    this.flushInterval = setInterval(() => this.flush(), 30000);
  }

  track(name: string, params?: Record<string, string | number>) {
    this.queue.push({ name, params });
    if (this.queue.length >= 10) this.flush();
  }

  private async flush() {
    const events = [...this.queue];
    this.queue = [];
    for (const event of events) {
      await analytics().logEvent(event.name, event.params);
    }
  }

  setUser(userId: string) {
    analytics().setUserId(userId);
  }

  setScreen(screenName: string) {
    analytics().logScreenView({ screen_name: screenName, screen_class: screenName });
  }
}

export const analyticsService = new AnalyticsService();
