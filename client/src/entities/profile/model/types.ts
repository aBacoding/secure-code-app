import type { profileSchema } from './schema';
import type { z } from 'zod';

export type ProfileFormData = z.infer<typeof profileSchema>;
