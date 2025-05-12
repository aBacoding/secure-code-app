import { z } from 'zod';

export const profileSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  full_name: z.string().min(1, 'Full name is required'),
  username: z.string().optional(),
  email: z.string().optional(),
});
