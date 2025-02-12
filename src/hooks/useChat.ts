import { useState, useEffect, useCallback } from 'react';
import { wsService } from '../services/websocket';
import { MessageStore } from '../storage/messageStore';

export function useChat(conversationId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    MessageStore.getMessages(conversationId).then(setMessages);

    const unsubMsg = wsService.subscribe('new_message', (msg) => {
      if (msg.conversationId === conversationId) {
        setMessages(prev => [msg, ...prev]);
        MessageStore.saveMessage(msg);
      }
    });

    const unsubTyping = wsService.subscribe('typing', (data) => {
      if (data.conversationId === conversationId) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    });

    return () => { unsubMsg(); unsubTyping(); };
  }, [conversationId]);

  const sendMessage = useCallback((text: string) => {
    wsService.send('send_message', { conversationId, text });
  }, [conversationId]);

  return { messages, sendMessage, isTyping };
}
