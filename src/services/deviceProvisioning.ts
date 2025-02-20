import { BLEScanner } from './bleScanner';

interface WiFiCredentials { ssid: string; password: string; }

export class DeviceProvisioning {
  static async provisionDevice(deviceId: string, wifi: WiFiCredentials) {
    const device = await BLEScanner.connectToDevice(deviceId);
    const services = await device.discoverAllServicesAndCharacteristics();
    const PROVISION_SERVICE = '0000ff01-0000-1000-8000-00805f9b34fb';
    const WIFI_CHAR = '0000ff02-0000-1000-8000-00805f9b34fb';
    const payload = JSON.stringify(wifi);
    await device.writeCharacteristicWithResponseForService(
      PROVISION_SERVICE, WIFI_CHAR, btoa(payload)
    );
    return true;
  }
}
