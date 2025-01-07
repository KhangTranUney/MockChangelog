import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WidgetProps {
  data: { id: string; title: string; value: string; type: 'sensor' | 'status' | 'alert'; };
}

export const DashboardWidget: React.FC<WidgetProps> = ({ data }) => {
  return (
    <View style={[styles.card, styles[data.type]]}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.value}>{data.value}</Text>
    </View>
  );
};
