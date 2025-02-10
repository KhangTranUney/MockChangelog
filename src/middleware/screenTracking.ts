import { NavigationState } from '@react-navigation/native';
import { analyticsService } from '../services/analytics';

function getActiveRouteName(state: NavigationState): string {
  const route = state.routes[state.index];
  if (route.state) return getActiveRouteName(route.state as NavigationState);
  return route.name;
}

export function onNavigationStateChange(state: NavigationState | undefined) {
  if (!state) return;
  const currentScreen = getActiveRouteName(state);
  analyticsService.setScreen(currentScreen);
}
