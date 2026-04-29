import { useState, useEffect, useCallback } from 'react';
import { CheckInService, CheckInSchedule } from '../services/checkInService';

export function useCheckIn() {
  const [schedules, setSchedules] = useState<CheckInSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CheckInService.getActiveSchedules()
      .then(setSchedules)
      .finally(() => setLoading(false));
  }, []);

  const createSchedule = useCallback(async (intervalMinutes: number, contactIds: string[]) => {
    const schedule = await CheckInService.createSchedule(intervalMinutes, contactIds);
    setSchedules(prev => [...prev, schedule]);
  }, []);

  const confirmCheckIn = useCallback(async (scheduleId: string) => {
    await CheckInService.confirmCheckIn(scheduleId);
    setSchedules(prev =>
      prev.map(s => (s.id === scheduleId ? { ...s, lastCheckIn: Date.now() } : s)),
    );
  }, []);

  const cancelSchedule = useCallback(async (scheduleId: string) => {
    await CheckInService.cancelSchedule(scheduleId);
    setSchedules(prev => prev.filter(s => s.id !== scheduleId));
  }, []);

  const snooze = useCallback(async (scheduleId: string, minutes: number) => {
    await CheckInService.snooze(scheduleId, minutes);
  }, []);

  return { schedules, loading, createSchedule, confirmCheckIn, cancelSchedule, snooze };
}
