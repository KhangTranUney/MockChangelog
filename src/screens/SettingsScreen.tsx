import React from 'react';
import { SectionList, View, Text, Switch } from 'react-native';
import { useSettings } from '../hooks/useSettings';

export const SettingsScreen: React.FC = () => {
  const { sections, updateSetting } = useSettings();

  return (
    <SectionList
      sections={sections}
      renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
      renderItem={({ item }) => (
        <View>
          <Text>{item.label}</Text>
          {item.type === 'toggle' && (
            <Switch value={item.value} onValueChange={v => updateSetting(item.key, v)} />
          )}
        </View>
      )}
    />
  );
};
