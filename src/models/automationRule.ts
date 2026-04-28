export interface AutomationRule {
  id: string;
  name: string;
  trigger: { type: 'sensor' | 'time' | 'location'; condition: string; value: string };
  actions: { deviceId: string; command: string; params?: Record<string, any> }[];
  isEnabled: boolean;
  createdAt: number;
}
