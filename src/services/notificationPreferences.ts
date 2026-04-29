import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../api/client';

const NOTIFICATION_PREFS_KEY = '@safenest_notification_prefs';

export interface NotificationPreferences {
  alertsEnabled: boolean;
  sosEnabled: boolean;
  deviceStatusEnabled: boolean;
  firmwareUpdatesEnabled: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

const DEFAULT_PREFS: NotificationPreferences = {
  alertsEnabled: true,
  sosEnabled: true,
  deviceStatusEnabled: true,
  firmwareUpdatesEnabled: true,
  quietHoursEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00',
};

export class NotificationPreferencesService {
  static async getPreferences(): Promise<NotificationPreferences> {
    const stored = await AsyncStorage.getItem(NOTIFICATION_PREFS_KEY);
    return stored ? { ...DEFAULT_PREFS, ...JSON.parse(stored) } : DEFAULT_PREFS;
  }

  static async updatePreferences(prefs: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    const current = await this.getPreferences();
    const updated = { ...current, ...prefs };
    await AsyncStorage.setItem(NOTIFICATION_PREFS_KEY, JSON.stringify(updated));
    await apiClient.put('/notifications/preferences', updated);
    return updated;
  }

  static async resetToDefaults(): Promise<NotificationPreferences> {
    await AsyncStorage.setItem(NOTIFICATION_PREFS_KEY, JSON.stringify(DEFAULT_PREFS));
    await apiClient.put('/notifications/preferences', DEFAULT_PREFS);
    return DEFAULT_PREFS;
  }
}
