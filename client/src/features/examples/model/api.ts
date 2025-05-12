import { get } from '@/shared/config/http';
import { type AxiosResponse } from 'axios';
import { type ExampleResponse } from '@/features/examples';

export const getExamples = async (): Promise<AxiosResponse<ExampleResponse>> => {
  return get('/examples');
};
