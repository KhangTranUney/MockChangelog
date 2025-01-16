import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export const BottomTabs: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen name='Dashboard' component={DashboardScreen} />
    <Tab.Screen name='Profile' component={ProfileScreen} />
    <Tab.Screen name='Settings' component={SettingsScreen} />
  </Tab.Navigator>
);
