import { type SignInResponse, type SignInFormValues } from '@/entities/auth/sign-in';
import { post } from '@/shared/config/http';
import type { AxiosResponse } from 'axios';

export const signIn = (data: SignInFormValues): Promise<AxiosResponse<SignInResponse>> => {
  return post('/auth/login', data);
};
