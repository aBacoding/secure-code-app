import { type ProfileFormData } from '@/entities/profile';
import {
  type ChangePasswordFormData,
  type GenerateHistory,
  type AnalyzeHistory,
  type AnalyzeHistoryItemById,
  type GenerateHistoryItemById,
} from '@/features/profile';
import { del, get, post, put } from '@/shared/config/http';
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

export const getGenerateHistory = (): Promise<AxiosResponse<GenerateHistory>> => {
  return get('/generate/history');
};

export const getGenerateHistoryById = (id: string): Promise<AxiosResponse<GenerateHistoryItemById>> => {
  return get(`/generate/history/${id}`);
};

export const deleteGenerateHistoryById = (id: string): Promise<AxiosResponse<GenerateHistoryItemById>> => {
  return del(`/generate/history/${id}`);
};

export const getAnalyzeHistory = (): Promise<AxiosResponse<AnalyzeHistory>> => {
  return get('/analyzer/history');
};

export const getAnalyzeHistoryById = (id: string): Promise<AxiosResponse<AnalyzeHistoryItemById>> => {
  return get(`/analyzer/history/${id}`);
};

export const deleteAnalyzeHistoryById = (id: string): Promise<AxiosResponse<AnalyzeHistoryItemById>> => {
  return del(`/analyzer/history/${id}`);
};
