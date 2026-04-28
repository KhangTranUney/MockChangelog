import { apiClient } from '../api/client';
import Geolocation from '@react-native-community/geolocation';

export class EmergencyService {
  static async sendSOS(): Promise<void> {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 5000 });
    });

    await apiClient.post('/emergency/sos', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timestamp: Date.now(),
    });
  }

  static async notifyContacts(message: string): Promise<void> {
    await apiClient.post('/emergency/notify', { message });
  }

  static async cancelSOS(): Promise<void> {
    await apiClient.post('/emergency/cancel');
  }
}
