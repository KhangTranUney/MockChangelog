import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SensorChart } from '../components/SensorChart';
import { TimeRangeSelector } from '../components/TimeRangeSelector';
import { useSensorHistory } from '../hooks/useSensorHistory';

export const SensorHistoryScreen: React.FC<{ route: any }> = ({ route }) => {
  const { sensorId } = route.params;
  const [range, setRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const { data, isLoading, stats } = useSensorHistory(sensorId, range);

  return (
    <ScrollView style={styles.container}>
      <TimeRangeSelector selected={range} onSelect={setRange} />
      <SensorChart data={data} isLoading={isLoading} />
      <View style={styles.stats}>
        <Text>Min: {stats.min}</Text>
        <Text>Max: {stats.max}</Text>
        <Text>Avg: {stats.avg}</Text>
      </View>
    </ScrollView>
  );
};
