import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

type Range = '1h' | '24h' | '7d' | '30d';

export function useSensorHistory(sensorId: string, range: Range) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ min: 0, max: 0, avg: 0 });

  useEffect(() => {
    setIsLoading(true);
    apiClient.get('/sensors/' + sensorId + '/history', { params: { range } })
      .then(res => {
        setData(res.data.readings);
        const values = res.data.readings.map((r: any) => r.value);
        setStats({
          min: Math.min(...values),
          max: Math.max(...values),
          avg: values.reduce((a: number, b: number) => a + b, 0) / values.length,
        });
      })
      .finally(() => setIsLoading(false));
  }, [sensorId, range]);

  return { data, isLoading, stats };
}
