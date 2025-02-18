import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

interface Alarm { id: string; label: string; time: string; isActive: boolean; days: number[]; }

interface Props {
  alarm: Alarm;
  onToggle: (id: string, active: boolean) => void;
  onDelete: (id: string) => void;
}

export const AlarmCard: React.FC<Props> = ({ alarm, onToggle, onDelete }) => (
  <Swipeable renderRightActions={() => (
    <View style={styles.deleteAction}>
      <Text style={styles.deleteText} onPress={() => onDelete(alarm.id)}>Delete</Text>
    </View>
  )}>
    <View style={styles.card}>
      <View>
        <Text style={styles.time}>{alarm.time}</Text>
        <Text style={styles.label}>{alarm.label}</Text>
      </View>
      <Switch value={alarm.isActive} onValueChange={v => onToggle(alarm.id, v)} />
    </View>
  </Swipeable>
);
