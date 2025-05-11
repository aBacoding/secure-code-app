import type { z } from 'zod';
import { type signUpSchema } from '@/entities/auth/sign-up';

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

export interface CountryData {
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
        common: string;
      };
      tsn: {
        official: string;
        common: string;
      };
    };
  };
  cca2: string;
  cca3: string;
  capital: string[];
  region: string;
}
