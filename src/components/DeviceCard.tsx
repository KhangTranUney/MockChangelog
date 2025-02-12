import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface DeviceInfo {
  id: string; name: string; type: string; rssi: number;
  isConnected: boolean; batteryLevel?: number;
}

export const DeviceCard: React.FC<{ device: DeviceInfo }> = ({ device }) => (
  <TouchableOpacity style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.name}>{device.name}</Text>
      <View style={[styles.status, { backgroundColor: device.isConnected ? '#4CAF50' : '#9E9E9E' }]} />
    </View>
    <Text style={styles.type}>{device.type}</Text>
    <Text style={styles.signal}>Signal: {device.rssi} dBm</Text>
    {device.batteryLevel !== undefined && (
      <Text style={styles.battery}>Battery: {device.batteryLevel}%</Text>
    )}
  </TouchableOpacity>
);
