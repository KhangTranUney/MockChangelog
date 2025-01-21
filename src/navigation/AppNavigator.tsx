import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabs } from './BottomTabs';
import { LoginScreen } from '../screens/LoginScreen';
import { useAuth } from '../hooks/useAuth';
import { linking } from './deepLinking';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name='Main' component={BottomTabs} />
        ) : (
          <Stack.Screen name='Login' component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
