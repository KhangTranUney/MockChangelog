export interface TrustedContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relationship: 'family' | 'friend' | 'neighbor' | 'other';
  notifyOnSOS: boolean;
  notifyOnCheckIn: boolean;
  createdAt: number;
}
