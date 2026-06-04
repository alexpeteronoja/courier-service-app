import { randomBytes } from 'crypto';

export const trackingCode = () => {
  const date = new Date();
  const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

  // Generate 6 random bytes (48 bits) - extremely low collision probability
  const randomPart = randomBytes(4).toString('hex').toUpperCase();

  return `TRK-${datePart}-${randomPart}`;
};
