import { type GenerateCodeResponse, type CodeGenerationRequest } from '@/entities/generate';
import { post } from '@/shared/config/http';
import { type AxiosResponse } from 'axios';

export const generateCode = async (request: CodeGenerationRequest): Promise<AxiosResponse<GenerateCodeResponse>> => {
  return post('/generate/code', request);
};
