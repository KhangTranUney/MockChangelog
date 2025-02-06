import React, { useState, useRef } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text } from 'react-native';
import { MessageBubble } from '../components/MessageBubble';
import { TypingIndicator } from '../components/TypingIndicator';
import { useChat } from '../hooks/useChat';

export const ChatScreen: React.FC<{ route: any }> = ({ route }) => {
  const { conversationId } = route.params;
  const { messages, sendMessage, isTyping } = useChat(conversationId);
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) { sendMessage(text); setText(''); }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        inverted
        renderItem={({ item }) => <MessageBubble message={item} />}
        keyExtractor={m => m.id}
      />
      {isTyping && <TypingIndicator />}
      <View style={{ flexDirection: 'row', padding: 8 }}>
        <TextInput value={text} onChangeText={setText} style={{ flex: 1 }} />
        <TouchableOpacity onPress={handleSend}><Text>Send</Text></TouchableOpacity>
      </View>
    </View>
  );
};
