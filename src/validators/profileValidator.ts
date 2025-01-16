export function validateProfile(data: { displayName?: string; phone?: string }) {
  const errors: Record<string, string> = {};
  if (data.displayName && data.displayName.length < 2) {
    errors.displayName = 'Name must be at least 2 characters';
  }
  if (data.displayName && data.displayName.length > 50) {
    errors.displayName = 'Name must be at most 50 characters';
  }
  if (data.phone && !/^\+?[0-9]{10,15}$/.test(data.phone)) {
    errors.phone = 'Invalid phone number format';
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}
