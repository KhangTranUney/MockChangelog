import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useGeofence } from '../hooks/useGeofence';

export const GeofenceScreen: React.FC = () => {
  const { zones, loading, removeZone } = useGeofence();

  const handleRemove = (id: string, name: string) => {
    Alert.alert('Remove Zone', `Remove "${name}" geofence zone?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeZone(id) },
    ]);
  };

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geofence Alerts</Text>
      <Text style={styles.subtitle}>Get notified when family members enter or leave safe zones.</Text>

      <FlatList
        data={zones}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.zoneCard}>
            <View style={styles.zoneInfo}>
              <Text style={styles.zoneName}>{item.name}</Text>
              <Text style={styles.zoneRadius}>{item.radiusMeters}m radius</Text>
              <Text style={styles.zoneFlags}>
                {item.alertOnEntry && 'Entry'}{item.alertOnEntry && item.alertOnExit && ' / '}{item.alertOnExit && 'Exit'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.id, item.name)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No geofence zones configured.</Text>}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Safe Zone</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  zoneCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, backgroundColor: '#F8F8F8', borderRadius: 10, marginBottom: 8 },
  zoneInfo: { flex: 1 },
  zoneName: { fontSize: 16, fontWeight: '600' },
  zoneRadius: { fontSize: 13, color: '#666', marginTop: 2 },
  zoneFlags: { fontSize: 12, color: '#007AFF', marginTop: 2 },
  removeText: { color: '#FF3B30', fontSize: 14 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 40 },
  addButton: { backgroundColor: '#34C759', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  addButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
