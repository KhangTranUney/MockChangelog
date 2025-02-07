import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Message { id: string; text: string; senderId: string; timestamp: number; isMine: boolean; }

export const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
  <View style={[styles.bubble, message.isMine ? styles.mine : styles.theirs]}>
    <Text style={styles.text}>{message.text}</Text>
    <Text style={styles.time}>
      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </Text>
  </View>
);
