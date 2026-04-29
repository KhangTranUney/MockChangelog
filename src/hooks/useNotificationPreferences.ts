import { useState, useEffect, useCallback } from 'react';
import {
  NotificationPreferencesService,
  NotificationPreferences,
} from '../services/notificationPreferences';

export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    NotificationPreferencesService.getPreferences()
      .then(setPreferences)
      .finally(() => setLoading(false));
  }, []);

  const updatePreference = useCallback(
    async <K extends keyof NotificationPreferences>(key: K, value: NotificationPreferences[K]) => {
      const updated = await NotificationPreferencesService.updatePreferences({ [key]: value });
      setPreferences(updated);
    },
    [],
  );

  const resetDefaults = useCallback(async () => {
    setLoading(true);
    const defaults = await NotificationPreferencesService.resetToDefaults();
    setPreferences(defaults);
    setLoading(false);
  }, []);

  return { preferences, loading, updatePreference, resetDefaults };
}
