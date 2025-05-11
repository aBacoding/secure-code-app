import type { z } from 'zod';
import type { signInFormSchema } from '@/entities/auth/sign-in';

export type SignInFormValues = z.infer<typeof signInFormSchema>;
