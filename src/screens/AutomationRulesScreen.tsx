import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAutomationRules } from '../hooks/useAutomationRules';

export const AutomationRulesScreen: React.FC = () => {
  const { rules, toggleRule, deleteRule } = useAutomationRules();

  return (
    <View style={styles.container}>
      <FlatList
        data={rules}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => toggleRule(item.id)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.status}>{item.isEnabled ? 'Active' : 'Disabled'}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={r => r.id}
      />
    </View>
  );
};
