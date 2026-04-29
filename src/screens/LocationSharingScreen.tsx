import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocationSharing } from '../hooks/useLocationSharing';

const DURATION_OPTIONS = [15, 30, 60, 120];

export const LocationSharingScreen: React.FC = () => {
  const { sessions, sharing, loading, startSharing, stopSharing } = useLocationSharing();
  const [selectedDuration, setSelectedDuration] = useState(30);

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Sharing</Text>
      <Text style={styles.subtitle}>
        {sharing ? 'You are currently sharing your location' : 'Share your location with trusted contacts'}
      </Text>

      {!sharing && (
        <View style={styles.durationRow}>
          {DURATION_OPTIONS.map(d => (
            <TouchableOpacity
              key={d}
              style={[styles.durationChip, selectedDuration === d && styles.durationChipActive]}
              onPress={() => setSelectedDuration(d)}
            >
              <Text style={selectedDuration === d ? styles.durationTextActive : styles.durationText}>
                {d} min
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {!sharing && (
        <TouchableOpacity style={styles.shareButton} onPress={() => startSharing([], selectedDuration)}>
          <Text style={styles.shareButtonText}>Start Sharing</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={sessions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.sessionCard}>
            <Text>Sharing with {item.contactIds.length} contacts</Text>
            <TouchableOpacity onPress={() => stopSharing(item.id)}>
              <Text style={styles.stopText}>Stop</Text>
            </TouchableOpacity>
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
  durationRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  durationChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F0F0F0' },
  durationChipActive: { backgroundColor: '#007AFF' },
  durationText: { color: '#333' },
  durationTextActive: { color: '#FFF' },
  shareButton: { backgroundColor: '#007AFF', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  shareButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  sessionCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, backgroundColor: '#F8F8F8', borderRadius: 8, marginBottom: 8 },
  stopText: { color: '#FF3B30', fontWeight: '600' },
});
