import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';
import { type AxiosError, type AxiosRequestConfig } from 'axios';
import { get } from '@/shared/config/http';

interface UseFetchOptions<TData, TError> extends Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> {
  axiosConfig?: AxiosRequestConfig;
}

export function useFetch<TData = unknown, TError = AxiosError>(
  url: string,
  options?: UseFetchOptions<TData, TError>,
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError>({
    queryKey: [url],
    queryFn: async () => {
      const { data } = await get<TData>(url, options?.axiosConfig);
      return data;
    },
    ...options,
  });
}
