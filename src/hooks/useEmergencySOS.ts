import { useState, useCallback, useRef } from 'react';
import { EmergencyService } from '../services/emergencyService';

export function useEmergencySOS() {
  const [status, setStatus] = useState<'idle' | 'countdown' | 'active'>('idle');
  const [countdown, setCountdown] = useState(5);
  const timerRef = useRef<NodeJS.Timeout>();

  const triggerSOS = useCallback(() => {
    setStatus('countdown');
    setCountdown(5);
    let remaining = 5;
    timerRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        setStatus('active');
        EmergencyService.sendSOS();
        EmergencyService.notifyContacts('Emergency SOS triggered from SafeNest app');
      }
    }, 1000);
  }, []);

  const cancelSOS = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStatus('idle');
    setCountdown(5);
  }, []);

  return { triggerSOS, cancelSOS, status, countdown };
}
