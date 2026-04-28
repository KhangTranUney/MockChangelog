import { AutomationRule } from '../models/automationRule';
import { wsService } from './websocket';
import { apiClient } from '../api/client';

class AutomationEngine {
  private rules: AutomationRule[] = [];

  async loadRules() {
    const res = await apiClient.get('/automation/rules');
    this.rules = res.data;
    this.subscribeToTriggers();
  }

  private subscribeToTriggers() {
    wsService.subscribe('sensor_update', (data) => {
      const matching = this.rules.filter(
        r => r.isEnabled && r.trigger.type === 'sensor' && r.trigger.condition === data.sensorId
      );
      matching.forEach(rule => this.executeActions(rule));
    });
  }

  private async executeActions(rule: AutomationRule) {
    for (const action of rule.actions) {
      await apiClient.post('/devices/' + action.deviceId + '/command', {
        command: action.command,
        params: action.params,
      });
    }
  }
}

export const automationEngine = new AutomationEngine();
