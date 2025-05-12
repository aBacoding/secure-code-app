import { z } from 'zod';

export const analysisHistorySchema = z.object({
  code: z.string().min(5, { message: 'Code must be at least 5 characters.' }),
  prompt: z.string().min(5, { message: 'Prompt must be at least 5 characters.' }),
});
