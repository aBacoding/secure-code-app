import type { z } from 'zod';
import type { signInFormSchema } from '@/entities/auth/sign-in';

export type SignInFormValues = z.infer<typeof signInFormSchema>;

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    full_name: string;
    country: string;
    avatar: string | null;
  };
}
