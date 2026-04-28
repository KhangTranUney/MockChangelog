import { useState, useEffect, useCallback } from 'react';
import { BiometricService } from '../services/biometricService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BIOMETRIC_ENABLED_KEY = '@safenest_biometric_enabled';

export function useBiometric() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [biometryType, setBiometryType] = useState('');

  useEffect(() => {
    BiometricService.isAvailable().then(({ available, type }) => {
      setIsAvailable(available);
      setBiometryType(type);
    });
    AsyncStorage.getItem(BIOMETRIC_ENABLED_KEY).then(val => setIsEnabled(val === 'true'));
  }, []);

  const toggle = useCallback(async () => {
    if (!isEnabled) {
      const success = await BiometricService.authenticate('Enable biometric login');
      if (success) { setIsEnabled(true); await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, 'true'); }
    } else {
      setIsEnabled(false);
      await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, 'false');
    }
  }, [isEnabled]);

  return { isAvailable, isEnabled, biometryType, toggle };
}
