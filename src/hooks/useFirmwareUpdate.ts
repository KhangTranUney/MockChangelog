import { useState, useEffect, useCallback } from 'react';
import { FirmwareService } from '../services/firmwareService';

export function useFirmwareUpdate(deviceId: string) {
  const [status, setStatus] = useState<'idle' | 'checking' | 'updating' | 'done' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [currentVersion, setCurrentVersion] = useState('');
  const [latestVersion, setLatestVersion] = useState('');

  useEffect(() => {
    setStatus('checking');
    FirmwareService.checkForUpdate(deviceId).then(info => {
      setCurrentVersion(info.currentVersion);
      setLatestVersion(info.latestVersion);
      setStatus('idle');
    });
  }, [deviceId]);

  const startUpdate = useCallback(async () => {
    setStatus('updating');
    setProgress(0);
    try {
      const firmware = await FirmwareService.downloadFirmware(deviceId);
      await FirmwareService.flashFirmware(deviceId, firmware, setProgress);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }, [deviceId]);

  return { status, progress, currentVersion, latestVersion, startUpdate };
}
