import { useState, useEffect, useCallback } from 'react';
import { profileApi } from '../api/profileApi';

export function useProfile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    profileApi.getProfile().then(res => setProfile(res.data));
  }, []);

  const updateProfile = useCallback(async (data: any) => {
    const res = await profileApi.updateProfile(data);
    setProfile(res.data);
  }, []);

  const uploadAvatar = useCallback(async (uri: string) => {
    const res = await profileApi.uploadAvatar(uri);
    setProfile((prev: any) => ({ ...prev, avatarUrl: res.data.url }));
  }, []);

  return { profile, updateProfile, uploadAvatar };
}
