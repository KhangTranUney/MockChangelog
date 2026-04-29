import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCheckIn } from '../hooks/useCheckIn';

const INTERVAL_OPTIONS = [
  { label: 'Every 30 min', value: 30 },
  { label: 'Every 1 hour', value: 60 },
  { label: 'Every 2 hours', value: 120 },
  { label: 'Every 4 hours', value: 240 },
];

export const CheckInScreen: React.FC = () => {
  const { schedules, loading, createSchedule, confirmCheckIn, cancelSchedule } = useCheckIn();
  const [selectedInterval, setSelectedInterval] = useState(60);

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety Check-In</Text>
      <Text style={styles.subtitle}>
        Set a recurring timer. If you don't check in, your contacts will be notified.
      </Text>

      <View style={styles.intervalRow}>
        {INTERVAL_OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.chip, selectedInterval === opt.value && styles.chipActive]}
            onPress={() => setSelectedInterval(opt.value)}
          >
            <Text style={selectedInterval === opt.value ? styles.chipTextActive : styles.chipText}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.startButton} onPress={() => createSchedule(selectedInterval, [])}>
        <Text style={styles.startButtonText}>Start Check-In Timer</Text>
      </TouchableOpacity>

      <FlatList
        data={schedules}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.scheduleCard}>
            <View>
              <Text style={styles.cardTitle}>Every {item.intervalMinutes} min</Text>
              <Text style={styles.cardSub}>
                {item.lastCheckIn ? `Last: ${new Date(item.lastCheckIn).toLocaleTimeString()}` : 'No check-ins yet'}
              </Text>
            </View>
            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.checkInButton} onPress={() => confirmCheckIn(item.id)}>
                <Text style={styles.checkInText}>I'm OK</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cancelSchedule(item.id)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  intervalRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F0F0F0' },
  chipActive: { backgroundColor: '#34C759' },
  chipText: { color: '#333' },
  chipTextActive: { color: '#FFF' },
  startButton: { backgroundColor: '#34C759', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  startButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  scheduleCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, backgroundColor: '#F8F8F8', borderRadius: 8, marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardSub: { fontSize: 12, color: '#999', marginTop: 2 },
  cardActions: { alignItems: 'flex-end', gap: 6 },
  checkInButton: { backgroundColor: '#34C759', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6 },
  checkInText: { color: '#FFF', fontWeight: '600' },
  cancelText: { color: '#FF3B30', fontSize: 13 },
});
