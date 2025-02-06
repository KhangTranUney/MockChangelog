import { WS_URL } from '../config/env';
import { TokenStorage } from '../utils/tokenStorage';

type MessageHandler = (data: any) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private handlers = new Map<string, Set<MessageHandler>>();
  private reconnectTimer: NodeJS.Timeout | null = null;

  async connect() {
    const token = await TokenStorage.getAccessToken();
    this.ws = new WebSocket(WS_URL + '?token=' + token);
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handlers.get(data.type)?.forEach(fn => fn(data.payload));
    };
    this.ws.onclose = () => {
      this.reconnectTimer = setTimeout(() => this.connect(), 3000);
    };
  }

  subscribe(event: string, handler: MessageHandler) {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return () => this.handlers.get(event)?.delete(handler);
  }

  send(type: string, payload: any) {
    this.ws?.send(JSON.stringify({ type, payload }));
  }

  disconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
  }
}

export const wsService = new WebSocketService();
