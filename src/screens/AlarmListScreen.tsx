import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { AlarmCard } from '../components/AlarmCard';
import { useAlarms } from '../hooks/useAlarms';

export const AlarmListScreen: React.FC = () => {
  const { alarms, toggleAlarm, deleteAlarm } = useAlarms();

  return (
    <View style={styles.container}>
      <FlatList
        data={alarms}
        renderItem={({ item }) => (
          <AlarmCard alarm={item} onToggle={toggleAlarm} onDelete={deleteAlarm} />
        )}
        keyExtractor={a => a.id}
      />
    </View>
  );
};
