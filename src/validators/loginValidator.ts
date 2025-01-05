export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateLoginForm(email: string, password: string): ValidationResult {
  const errors: Record<string, string> = {};

  if (!email.trim()) errors.email = 'Email is required';
  else if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) errors.email = 'Invalid email format';

  if (!password) errors.password = 'Password is required';
  else if (password.length < 8) errors.password = 'Password must be at least 8 characters';

  return { isValid: Object.keys(errors).length === 0, errors };
}
