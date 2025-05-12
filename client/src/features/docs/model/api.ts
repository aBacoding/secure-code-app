import { type DocsResponse } from '@/features/docs';
import { get } from '@/shared/config/http';
import type { AxiosResponse } from 'axios';

export const getDocs = async (): Promise<AxiosResponse<DocsResponse>> => {
  return get('/docs');
};
