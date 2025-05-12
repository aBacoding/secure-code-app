import { type ProfileFormData } from '@/entities/profile';
import { type ChangePasswordFormData } from '@/features/profile';
import { del, post, put } from '@/shared/config/http';
import type { AxiosResponse } from 'axios';
import type { User } from '@/shared/types';

export const updateProfile = (data: ProfileFormData): Promise<AxiosResponse<{ user: User }>> => {
  return put('/users/profile', data);
};

export const changePassword = (data: ChangePasswordFormData): Promise<AxiosResponse<{ user: User }>> => {
  return put('/users/password', data);
};

export const updateAvatar = (data: FormData): Promise<AxiosResponse<{ avatar: string }>> => {
  return post('/users/avatar', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteAvatar = (): Promise<AxiosResponse<{ user: User }>> => {
  return del('/users/avatar');
};
