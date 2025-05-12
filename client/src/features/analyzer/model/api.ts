import { type AnalyzeCodeResponse, type AnalyzeCodeRequest } from '@/entities/analyzer';
import { del, get, post } from '@/shared/config/http';
import { type AxiosResponse } from 'axios';

export const analyzeCode = async (request: AnalyzeCodeRequest): Promise<AxiosResponse<AnalyzeCodeResponse>> => {
  return post('/analyzer/analyze', request);
};

export const getAnalyzerHistory = async (): Promise<AxiosResponse<AnalyzeCodeResponse>> => {
  return get('/analyzer/history');
};

export const deleteAnalyzerHistory = async (historyId: string): Promise<AxiosResponse<AnalyzeCodeResponse>> => {
  return del(`/analyzer/history/${historyId}`);
};

export const getAnalyzerHistoryById = async (historyId: string): Promise<AxiosResponse<AnalyzeCodeResponse>> => {
  return get(`/analyzer/history/${historyId}`);
};
