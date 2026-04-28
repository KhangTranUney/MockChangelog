import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Vibration, StyleSheet } from 'react-native';
import { useEmergencySOS } from '../hooks/useEmergencySOS';

export const EmergencySOSScreen: React.FC = () => {
  const { triggerSOS, cancelSOS, status, countdown } = useEmergencySOS();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Vibration.vibrate([0, 200, 100, 200]);
    triggerSOS();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.button, { transform: [{ scale: pulseAnim }] }]}>
        <TouchableOpacity onPress={handlePress} disabled={status === 'active'}>
          <Text style={styles.text}>SOS</Text>
        </TouchableOpacity>
      </Animated.View>
      {status === 'countdown' && <Text style={styles.countdown}>Sending in {countdown}s...</Text>}
      {status === 'countdown' && (
        <TouchableOpacity onPress={cancelSOS}><Text>Cancel</Text></TouchableOpacity>
      )}
    </View>
  );
};
