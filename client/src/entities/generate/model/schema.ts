import { z } from 'zod';

export const generateCodeSchema = z.object({
  prompt: z.string().min(5, {
    message: 'Prompt must be at least 5 characters.',
  }),
  language: z.string().default('javascript'),
});
