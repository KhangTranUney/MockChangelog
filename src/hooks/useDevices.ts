import { useState, useCallback } from 'react';
import { BLEScanner } from '../services/bleScanner';

export function useDevices() {
  const [devices, setDevices] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const startScan = useCallback(() => {
    setIsScanning(true);
    setDevices([]);
    BLEScanner.startScan((device) => {
      setDevices(prev => [...prev, {
        id: device.id,
        name: device.name || 'Unknown',
        type: 'SafeNest Sensor',
        rssi: device.rssi || 0,
        isConnected: false,
      }]);
    });
    setTimeout(() => setIsScanning(false), 10000);
  }, []);

  return { devices, isScanning, startScan };
}
