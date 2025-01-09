import { useState, useCallback, useEffect } from 'react';
import { AuthService } from '../services/authService';
import { TokenStorage } from '../utils/tokenStorage';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await AuthService.login(email, password);
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await AuthService.logout();
    setUser(null);
  }, []);

  return { user, isLoading, login, logout };
}
