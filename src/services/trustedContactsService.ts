import { apiClient } from '../api/client';
import { TrustedContact } from '../models/trustedContact';

export class TrustedContactsService {
  static async getContacts(): Promise<TrustedContact[]> {
    const response = await apiClient.get('/contacts/trusted');
    return response.data;
  }

  static async addContact(contact: Omit<TrustedContact, 'id' | 'createdAt'>): Promise<TrustedContact> {
    const response = await apiClient.post('/contacts/trusted', contact);
    return response.data;
  }

  static async updateContact(id: string, updates: Partial<TrustedContact>): Promise<TrustedContact> {
    const response = await apiClient.put(`/contacts/trusted/${id}`, updates);
    return response.data;
  }

  static async removeContact(id: string): Promise<void> {
    await apiClient.delete(`/contacts/trusted/${id}`);
  }

  static async verifyContact(id: string): Promise<void> {
    await apiClient.post(`/contacts/trusted/${id}/verify`);
  }
}
