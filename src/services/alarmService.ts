import notifee, { TriggerType, TimestampTrigger } from '@notifee/react-native';

export class AlarmService {
  static async scheduleAlarm(id: string, time: Date, label: string) {
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: time.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        id,
        title: 'SafeNest Alarm',
        body: label,
        android: { channelId: 'alarms', sound: 'alarm_sound' },
      },
      trigger
    );
  }

  static async cancelAlarm(id: string) {
    await notifee.cancelNotification(id);
  }

  static async getScheduledAlarms() {
    return notifee.getTriggerNotificationIds();
  }
}
