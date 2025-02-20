import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlarmService } from '../services/alarmService';

const ALARMS_KEY = '@safenest_alarms';

export function useAlarms() {
  const [alarms, setAlarms] = useState<any[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(ALARMS_KEY).then(data => {
      if (data) setAlarms(JSON.parse(data));
    });
  }, []);

  const saveAlarms = async (updated: any[]) => {
    setAlarms(updated);
    await AsyncStorage.setItem(ALARMS_KEY, JSON.stringify(updated));
  };

  const toggleAlarm = useCallback(async (id: string, active: boolean) => {
    const updated = alarms.map(a => a.id === id ? { ...a, isActive: active } : a);
    if (!active) await AlarmService.cancelAlarm(id);
    await saveAlarms(updated);
  }, [alarms]);

  const deleteAlarm = useCallback(async (id: string) => {
    await AlarmService.cancelAlarm(id);
    await saveAlarms(alarms.filter(a => a.id !== id));
  }, [alarms]);

  return { alarms, toggleAlarm, deleteAlarm };
}
