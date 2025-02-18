import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { BLEScanner } from '../services/bleScanner';

export const DevicePairingScreen: React.FC = () => {
  const [isPairing, setIsPairing] = useState(false);

  const handleBarCodeRead = async (event: { data: string }) => {
    if (isPairing) return;
    setIsPairing(true);
    try {
      const deviceId = JSON.parse(event.data).deviceId;
      await BLEScanner.connectToDevice(deviceId);
      Alert.alert('Success', 'Device paired successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to pair device. Please try again.');
    } finally {
      setIsPairing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Device QR Code</Text>
      <RNCamera style={styles.camera} onBarCodeRead={handleBarCodeRead} captureAudio={false} />
    </View>
  );
};
