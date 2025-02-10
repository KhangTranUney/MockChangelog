import { useCallback } from 'react';
import { analyticsService } from '../services/analytics';

export function useAnalytics(screenName: string) {
  const trackEvent = useCallback((event: string, params?: Record<string, string | number>) => {
    analyticsService.track(event, { ...params, screen: screenName });
  }, [screenName]);

  const trackButtonPress = useCallback((buttonName: string) => {
    trackEvent('button_press', { button: buttonName });
  }, [trackEvent]);

  return { trackEvent, trackButtonPress };
}
