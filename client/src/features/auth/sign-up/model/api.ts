import { get, post } from '@/shared/config/http';
import {
  COUNTRIES_LIST_URL,
  getCountryFlagUrl,
  type CountryData,
  type SignUpFormData,
  type SignUpResponse,
} from '@/entities/auth/sign-up';
import type { AxiosResponse } from 'axios';

export const signUp = (data: SignUpFormData): Promise<AxiosResponse<SignUpResponse>> => {
  return post('/auth/register', data);
};

export const getCountries = (): Promise<AxiosResponse<CountryData[]>> => {
  return get(COUNTRIES_LIST_URL);
};

export const getCountryFlag = (countryName: string): Promise<AxiosResponse<CountryData>> => {
  return get(getCountryFlagUrl(countryName));
};
