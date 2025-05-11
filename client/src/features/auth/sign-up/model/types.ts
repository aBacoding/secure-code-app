import { type CountryData } from '@/entities/auth/sign-up';

export interface CountriesState {
  countries: CountryData[];
  isLoading: boolean;
  error: string | null;
  fetchCountries: () => Promise<void>;
  setCountries: (countries: CountryData[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}
