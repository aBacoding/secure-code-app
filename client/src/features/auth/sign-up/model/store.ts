import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { CountryData } from '@/entities/auth/sign-up';
import { getCountries, type CountriesState } from '@/features/auth/sign-up';

export const useCountriesStore = create<CountriesState>()(
  devtools(
    (set) => ({
      countries: [],
      isLoading: false,
      error: null,
      fetchCountries: async (): Promise<void> => {
        try {
          set({ isLoading: true, error: null });
          const response = await getCountries();
          set({ countries: response.data, isLoading: false });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch countries', isLoading: false });
        }
      },
      setCountries: (countries: CountryData[]): void => set({ countries }),
      setLoading: (isLoading: boolean): void => set({ isLoading }),
      setError: (error: string | null): void => set({ error }),
    }),
    { name: 'countries-store' },
  ),
);
