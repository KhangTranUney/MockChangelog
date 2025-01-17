import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tieng Viet' },
  { code: 'ja', label: 'Japanese' },
];

interface Props { current: string; onSelect: (code: string) => void; }

export const LanguageSelector: React.FC<Props> = ({ current, onSelect }) => (
  <FlatList
    data={LANGUAGES}
    keyExtractor={item => item.code}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onSelect(item.code)}>
        <Text style={{ fontWeight: item.code === current ? 'bold' : 'normal' }}>
          {item.label}
        </Text>
      </TouchableOpacity>
    )}
  />
);
