import React from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNotificationPreferences } from '../hooks/useNotificationPreferences';

export const NotificationSettingsScreen: React.FC = () => {
  const { preferences, loading, updatePreference, resetDefaults } = useNotificationPreferences();

  if (loading || !preferences) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Notification Types</Text>
      <View style={styles.row}>
        <Text>Security Alerts</Text>
        <Switch value={preferences.alertsEnabled} onValueChange={v => updatePreference('alertsEnabled', v)} />
      </View>
      <View style={styles.row}>
        <Text>Emergency SOS</Text>
        <Switch value={preferences.sosEnabled} onValueChange={v => updatePreference('sosEnabled', v)} />
      </View>
      <View style={styles.row}>
        <Text>Device Status</Text>
        <Switch value={preferences.deviceStatusEnabled} onValueChange={v => updatePreference('deviceStatusEnabled', v)} />
      </View>
      <View style={styles.row}>
        <Text>Firmware Updates</Text>
        <Switch value={preferences.firmwareUpdatesEnabled} onValueChange={v => updatePreference('firmwareUpdatesEnabled', v)} />
      </View>

      <Text style={styles.sectionTitle}>Quiet Hours</Text>
      <View style={styles.row}>
        <Text>Enable Quiet Hours</Text>
        <Switch value={preferences.quietHoursEnabled} onValueChange={v => updatePreference('quietHoursEnabled', v)} />
      </View>
      {preferences.quietHoursEnabled && (
        <View style={styles.row}>
          <Text>From {preferences.quietHoursStart} to {preferences.quietHoursEnd}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={resetDefaults}>
        <Text style={styles.resetText}>Reset to Defaults</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  resetButton: { marginTop: 24, alignItems: 'center', padding: 12 },
  resetText: { color: '#FF3B30', fontSize: 16 },
});
