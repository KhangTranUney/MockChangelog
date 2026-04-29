import { useState, useEffect, useCallback, useRef } from 'react';
import { LocationSharingService, LocationSession } from '../services/locationSharingService';

const UPDATE_INTERVAL_MS = 30000;

export function useLocationSharing() {
  const [sessions, setSessions] = useState<LocationSession[]>([]);
  const [sharing, setSharing] = useState(false);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    LocationSharingService.getActiveSessions()
      .then(active => {
        setSessions(active);
        setSharing(active.some(s => s.isActive));
      })
      .finally(() => setLoading(false));
  }, []);

  const startSharing = useCallback(async (contactIds: string[], durationMinutes: number) => {
    const session = await LocationSharingService.startSharing(contactIds, durationMinutes);
    setSessions(prev => [...prev, session]);
    setSharing(true);

    intervalRef.current = setInterval(() => {
      LocationSharingService.updateLocation(session.id);
    }, UPDATE_INTERVAL_MS);
  }, []);

  const stopSharing = useCallback(async (sessionId: string) => {
    await LocationSharingService.stopSharing(sessionId);
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSharing(false);
  }, []);

  return { sessions, sharing, loading, startSharing, stopSharing };
}
