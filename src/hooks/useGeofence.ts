import { useState, useEffect, useCallback } from 'react';
import { GeofenceService, GeofenceZone } from '../services/geofenceService';

export function useGeofence() {
  const [zones, setZones] = useState<GeofenceZone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GeofenceService.getZones()
      .then(setZones)
      .finally(() => setLoading(false));
  }, []);

  const addZone = useCallback(async (zone: Omit<GeofenceZone, 'id'>) => {
    const created = await GeofenceService.createZone(zone);
    setZones(prev => [...prev, created]);
  }, []);

  const removeZone = useCallback(async (id: string) => {
    await GeofenceService.deleteZone(id);
    setZones(prev => prev.filter(z => z.id !== id));
  }, []);

  return { zones, loading, addZone, removeZone };
}
