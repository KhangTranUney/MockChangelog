import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/client';

const POLL_INTERVAL = 30000;

export function useDashboardData() {
  const [widgets, setWidgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const response = await apiClient.get('/dashboard/widgets');
    setWidgets(response.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { widgets, isLoading, refresh: fetchData };
}
