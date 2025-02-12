import React, { useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import { DeviceCard } from '../components/DeviceCard';
import { useDevices } from '../hooks/useDevices';

export const DeviceListScreen: React.FC = () => {
  const { devices, isScanning, startScan } = useDevices();
  const [search, setSearch] = useState('');

  const filtered = devices.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput placeholder='Search devices...' value={search} onChangeText={setSearch} />
      <FlatList
        data={filtered}
        renderItem={({ item }) => <DeviceCard device={item} />}
        keyExtractor={d => d.id}
        onRefresh={startScan}
        refreshing={isScanning}
      />
    </View>
  );
};
