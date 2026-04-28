import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/client';
import { AutomationRule } from '../models/automationRule';

export function useAutomationRules() {
  const [rules, setRules] = useState<AutomationRule[]>([]);

  useEffect(() => {
    apiClient.get('/automation/rules').then(res => setRules(res.data));
  }, []);

  const toggleRule = useCallback(async (id: string) => {
    const rule = rules.find(r => r.id === id);
    if (!rule) return;
    await apiClient.patch('/automation/rules/' + id, { isEnabled: !rule.isEnabled });
    setRules(prev => prev.map(r => r.id === id ? { ...r, isEnabled: !r.isEnabled } : r));
  }, [rules]);

  const deleteRule = useCallback(async (id: string) => {
    await apiClient.delete('/automation/rules/' + id);
    setRules(prev => prev.filter(r => r.id !== id));
  }, []);

  return { rules, toggleRule, deleteRule };
}
