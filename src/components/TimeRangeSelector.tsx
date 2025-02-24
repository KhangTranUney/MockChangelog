import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Range = '1h' | '24h' | '7d' | '30d';

interface Props { selected: Range; onSelect: (range: Range) => void; }

const ranges: Range[] = ['1h', '24h', '7d', '30d'];

export const TimeRangeSelector: React.FC<Props> = ({ selected, onSelect }) => (
  <View style={styles.container}>
    {ranges.map(range => (
      <TouchableOpacity
        key={range}
        onPress={() => onSelect(range)}
        style={[styles.button, selected === range && styles.selected]}
      >
        <Text style={selected === range ? styles.selectedText : styles.text}>{range}</Text>
      </TouchableOpacity>
    ))}
  </View>
);
