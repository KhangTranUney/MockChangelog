import React, { useRef } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const pages = [
  { title: 'Welcome to SafeNest', description: 'Your smart home safety companion' },
  { title: 'Monitor Your Home', description: 'Real-time sensors and alerts keep you informed' },
  { title: 'Stay Connected', description: 'Chat with family and manage devices on the go' },
];

export const OnboardingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const flatListRef = useRef<FlatList>(null);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={onComplete}>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};
