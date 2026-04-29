import { apiClient } from '../api/client';

export interface CheckInSchedule {
  id: string;
  intervalMinutes: number;
  contactIds: string[];
  isActive: boolean;
  lastCheckIn: number | null;
  nextCheckInDue: number | null;
}

export class CheckInService {
  static async createSchedule(intervalMinutes: number, contactIds: string[]): Promise<CheckInSchedule> {
    const response = await apiClient.post('/checkin/schedule', { intervalMinutes, contactIds });
    return response.data;
  }

  static async confirmCheckIn(scheduleId: string): Promise<void> {
    await apiClient.post(`/checkin/${scheduleId}/confirm`);
  }

  static async cancelSchedule(scheduleId: string): Promise<void> {
    await apiClient.delete(`/checkin/schedule/${scheduleId}`);
  }

  static async getActiveSchedules(): Promise<CheckInSchedule[]> {
    const response = await apiClient.get('/checkin/schedules');
    return response.data;
  }

  static async snooze(scheduleId: string, minutes: number): Promise<void> {
    await apiClient.post(`/checkin/${scheduleId}/snooze`, { minutes });
  }
}
