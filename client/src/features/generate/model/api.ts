import { type GenerateCodeResponse, type CodeGenerationRequest } from '@/entities/generate';
import { del, get, post } from '@/shared/config/http';
import { type AxiosResponse } from 'axios';

export const generateCode = async (request: CodeGenerationRequest): Promise<AxiosResponse<GenerateCodeResponse>> => {
  return post('/generate/code', request);
};

export const getGenerateHistory = async (): Promise<AxiosResponse<GenerateCodeResponse>> => {
  return get('/generate/history');
};

export const deleteGenerateHistory = async (historyId: string): Promise<AxiosResponse<GenerateCodeResponse>> => {
  return del(`/generate/history/${historyId}`);
};

export const getGenerateHistoryById = async (historyId: string): Promise<AxiosResponse<GenerateCodeResponse>> => {
  return get(`/generate/history/${historyId}`);
};
