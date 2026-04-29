import Geolocation from '@react-native-community/geolocation';
import { apiClient } from '../api/client';

export interface SharedLocation {
  latitude: number;
  longitude: number;
  timestamp: number;
  accuracy: number;
}

export interface LocationSession {
  id: string;
  contactIds: string[];
  expiresAt: number;
  isActive: boolean;
}

export class LocationSharingService {
  static async startSharing(contactIds: string[], durationMinutes: number): Promise<LocationSession> {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 10000 });
    });

    const response = await apiClient.post('/location/share', {
      contactIds,
      durationMinutes,
      location: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: Date.now(),
      },
    });
    return response.data;
  }

  static async stopSharing(sessionId: string): Promise<void> {
    await apiClient.post(`/location/share/${sessionId}/stop`);
  }

  static async updateLocation(sessionId: string): Promise<SharedLocation> {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 5000 });
    });

    const location: SharedLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timestamp: Date.now(),
      accuracy: position.coords.accuracy ?? 0,
    };

    await apiClient.put(`/location/share/${sessionId}`, location);
    return location;
  }

  static async getActiveSessions(): Promise<LocationSession[]> {
    const response = await apiClient.get('/location/share/active');
    return response.data;
  }
}
