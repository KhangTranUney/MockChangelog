import React from 'react';
import { View, Text, TouchableOpacity, ProgressBarAndroid, StyleSheet } from 'react-native';
import { useFirmwareUpdate } from '../hooks/useFirmwareUpdate';

export const FirmwareUpdateScreen: React.FC<{ route: any }> = ({ route }) => {
  const { deviceId } = route.params;
  const { status, progress, currentVersion, latestVersion, startUpdate } = useFirmwareUpdate(deviceId);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current: {currentVersion}</Text>
      <Text style={styles.label}>Latest: {latestVersion}</Text>
      {status === 'updating' && <ProgressBarAndroid styleAttr="Horizontal" progress={progress} />}
      <TouchableOpacity onPress={startUpdate} disabled={status === 'updating'}>
        <Text>{status === 'updating' ? 'Updating...' : 'Update Firmware'}</Text>
      </TouchableOpacity>
    </View>
  );
};
