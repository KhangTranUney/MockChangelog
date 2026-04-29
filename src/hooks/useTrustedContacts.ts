import { useState, useEffect, useCallback } from 'react';
import { TrustedContactsService } from '../services/trustedContactsService';
import { TrustedContact } from '../models/trustedContact';

export function useTrustedContacts() {
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TrustedContactsService.getContacts()
      .then(setContacts)
      .finally(() => setLoading(false));
  }, []);

  const addContact = useCallback(async (contact: Omit<TrustedContact, 'id' | 'createdAt'>) => {
    const created = await TrustedContactsService.addContact(contact);
    setContacts(prev => [...prev, created]);
  }, []);

  const updateContact = useCallback(async (id: string, updates: Partial<TrustedContact>) => {
    const updated = await TrustedContactsService.updateContact(id, updates);
    setContacts(prev => prev.map(c => (c.id === id ? updated : c)));
  }, []);

  const removeContact = useCallback(async (id: string) => {
    await TrustedContactsService.removeContact(id);
    setContacts(prev => prev.filter(c => c.id !== id));
  }, []);

  return { contacts, loading, addContact, updateContact, removeContact };
}
