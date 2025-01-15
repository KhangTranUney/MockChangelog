import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

export const colors = {
  light: { bg: '#FFFFFF', text: '#1A1A1A', primary: '#4A90D9', card: '#F5F5F5' },
  dark:  { bg: '#1A1A1A', text: '#F5F5F5', primary: '#6BB5FF', card: '#2D2D2D' },
};

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);
