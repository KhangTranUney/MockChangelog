import { BleManager, Device } from 'react-native-ble-plx';

const manager = new BleManager();

export class BLEScanner {
  private static devices = new Map<string, Device>();

  static startScan(onDeviceFound: (device: Device) => void): void {
    this.devices.clear();
    manager.startDeviceScan(null, { allowDuplicates: false }, (error, device) => {
      if (error) { console.error('BLE scan error:', error); return; }
      if (device?.name && !this.devices.has(device.id)) {
        this.devices.set(device.id, device);
        onDeviceFound(device);
      }
    });
    setTimeout(() => manager.stopDeviceScan(), 10000);
  }

  static stopScan(): void {
    manager.stopDeviceScan();
  }

  static async connectToDevice(deviceId: string) {
    const device = await manager.connectToDevice(deviceId);
    await device.discoverAllServicesAndCharacteristics();
    return device;
  }
}
