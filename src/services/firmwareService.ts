import { BLEScanner } from './bleScanner';
import { apiClient } from '../api/client';

export class FirmwareService {
  static async checkForUpdate(deviceId: string) {
    const res = await apiClient.get('/devices/' + deviceId + '/firmware/check');
    return { currentVersion: res.data.current, latestVersion: res.data.latest, hasUpdate: res.data.hasUpdate };
  }

  static async downloadFirmware(deviceId: string): Promise<ArrayBuffer> {
    const res = await apiClient.get('/devices/' + deviceId + '/firmware/download', { responseType: 'arraybuffer' });
    return res.data;
  }

  static async flashFirmware(deviceId: string, firmware: ArrayBuffer, onProgress: (p: number) => void) {
    const device = await BLEScanner.connectToDevice(deviceId);
    const OTA_SERVICE = '0000ff10-0000-1000-8000-00805f9b34fb';
    const OTA_CHAR = '0000ff11-0000-1000-8000-00805f9b34fb';
    const chunkSize = 512;
    const total = firmware.byteLength;

    for (let offset = 0; offset < total; offset += chunkSize) {
      const chunk = firmware.slice(offset, Math.min(offset + chunkSize, total));
      const base64 = btoa(String.fromCharCode(...new Uint8Array(chunk)));
      await device.writeCharacteristicWithResponseForService(OTA_SERVICE, OTA_CHAR, base64);
      onProgress((offset + chunkSize) / total);
    }
  }
}
