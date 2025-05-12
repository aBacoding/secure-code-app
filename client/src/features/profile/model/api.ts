import { type ProfileFormData } from '@/entities/profile';
import { type ChangePasswordFormData } from '@/features/profile';
import { put } from '@/shared/config/http';
import type { AxiosResponse } from 'axios';
import type { User } from '@/shared/types';

export const updateProfile = (data: ProfileFormData): Promise<AxiosResponse<{ user: User }>> => {
  return put('/users/profile', data);
};

export const changePassword = (data: ChangePasswordFormData): Promise<AxiosResponse<{ user: User }>> => {
  return put('/users/password', data);
};
