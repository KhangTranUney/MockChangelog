import React from 'react';
import { View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

interface DataPoint { timestamp: number; value: number; }

interface Props { data: DataPoint[]; isLoading: boolean; }

export const SensorChart: React.FC<Props> = ({ data, isLoading }) => {
  if (isLoading) return <ActivityIndicator />;

  const labels = data.filter((_, i) => i % Math.ceil(data.length / 6) === 0)
    .map(d => new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  return (
    <View style={styles.container}>
      <LineChart
        data={{ labels, datasets: [{ data: data.map(d => d.value) }] }}
        width={width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalCount: 1,
          color: (opacity = 1) => 'rgba(74, 144, 217, ' + opacity + ')',
        }}
        bezier
      />
    </View>
  );
};
