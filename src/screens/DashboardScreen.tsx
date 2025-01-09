import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { DashboardWidget } from '../components/DashboardWidget';
import { useDashboardData } from '../hooks/useDashboardData';

export const DashboardScreen: React.FC = () => {
  const { widgets, isLoading, refresh } = useDashboardData();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {widgets.map(widget => (
          <DashboardWidget key={widget.id} data={widget} />
        ))}
      </View>
    </ScrollView>
  );
};
