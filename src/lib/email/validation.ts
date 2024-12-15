import type { EmailData } from './types';

export function validateEmail(data: EmailData): string | null {
  if (!data.to || !Array.isArray(data.to) || data.to.length === 0) {
    return 'At least one recipient email is required';
  }

  // Validate email format for all recipients
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const invalidEmails = data.to.filter(email => !emailRegex.test(email));
  
  if (invalidEmails.length > 0) {
    return `Invalid email format: ${invalidEmails.join(', ')}`;
  }

  if (!data.subject?.trim()) {
    return 'Email subject is required';
  }

  if (!data.message?.trim()) {
    return 'Email message is required';
  }

  return null;
}