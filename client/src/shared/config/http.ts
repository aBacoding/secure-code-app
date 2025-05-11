import axiosInstance from '@/shared/config/axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axiosInstance.get<T>(url, config);
};

export const post = async <T, D = Record<string, unknown>>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return axiosInstance.post<T>(url, data, config);
};

export const put = async <T, D = Record<string, unknown>>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return axiosInstance.put<T>(url, data, config);
};

export const patch = async <T, D = Record<string, unknown>>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return axiosInstance.patch<T>(url, data, config);
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return axiosInstance.delete<T>(url, config);
};

export default {
  get,
  post,
  put,
  patch,
  delete: del,
};
