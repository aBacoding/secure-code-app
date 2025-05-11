import { z } from 'zod';
import { signUpSchema } from './schema';

export type SignUpFormData = z.infer<typeof signUpSchema>;

export interface SignUpResponse {
  user: {
    id: string;
    username: string;
    email: string;
    full_name: string;
    country: string;
    avatar: string | null;
  };
  accessToken: string;
  refreshToken: string;
}
