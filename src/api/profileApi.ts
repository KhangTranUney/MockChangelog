import { apiClient } from './client';

export const profileApi = {
  getProfile: () => apiClient.get('/user/profile'),
  updateProfile: (data: { displayName?: string; phone?: string }) =>
    apiClient.patch('/user/profile', data),
  uploadAvatar: async (uri: string) => {
    const formData = new FormData();
    formData.append('avatar', { uri, type: 'image/jpeg', name: 'avatar.jpg' } as any);
    return apiClient.post('/user/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
